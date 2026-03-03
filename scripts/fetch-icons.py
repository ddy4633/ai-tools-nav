#!/usr/bin/env python3
import json
import os
import re
import time
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SUPABASE_FILE = ROOT / 'lib' / 'supabase.ts'
OUTPUT_DIR = ROOT / 'public' / 'tool-icons'
MAPPING_FILE = ROOT / 'lib' / 'content' / 'tool-icons.ts'
REPORT_FILE = ROOT / 'lib' / 'content' / 'tool-icons-missing.json'

USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36'
TIMEOUT = 10

ICON_EXTS = {'.png', '.svg', '.ico', '.jpg', '.jpeg', '.webp'}
CONTENT_TYPE_TO_EXT = {
    'image/png': '.png',
    'image/svg+xml': '.svg',
    'image/x-icon': '.ico',
    'image/vnd.microsoft.icon': '.ico',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
}

COMMON_LOGO_PATHS = [
    '/logo.svg',
    '/logo.png',
    '/logo.webp',
    '/logo.jpg',
    '/logo.jpeg',
    '/assets/logo.svg',
    '/assets/logo.png',
    '/static/logo.svg',
    '/static/logo.png',
    '/images/logo.svg',
    '/images/logo.png',
    '/img/logo.svg',
    '/img/logo.png',
    '/brand/logo.svg',
    '/brand/logo.png',
    '/apple-touch-icon.png',
]

class IconParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.icons: List[Tuple[str, str, Optional[str]]] = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() != 'link':
            return
        attr = {k.lower(): v for k, v in attrs}
        rel = (attr.get('rel') or '').lower()
        if 'icon' not in rel:
            return
        href = attr.get('href')
        if not href or href.startswith('data:'):
            return
        sizes = attr.get('sizes')
        self.icons.append((href, rel, sizes))


class LogoParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.logos: List[Tuple[str, int]] = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() not in ('img', 'source'):
            return
        attr = {k.lower(): v for k, v in attrs}
        src = attr.get('src') or ''
        srcset = attr.get('srcset') or ''
        alt = (attr.get('alt') or '').lower()
        cls = (attr.get('class') or '').lower()
        aria = (attr.get('aria-label') or '').lower()
        title = (attr.get('title') or '').lower()
        data_src = (attr.get('data-src') or '').lower()

        candidates = []
        if src:
            candidates.append(src)
        if srcset:
            first = srcset.split(',')[0].strip().split(' ')[0]
            if first:
                candidates.append(first)
        if data_src:
            candidates.append(data_src)

        for href in candidates:
            if not href or href.startswith('data:'):
                continue
            score = 0
            path = href.lower()
            if any(k in path for k in ('logo', 'brand', 'wordmark', 'logomark')):
                score += 50
            if any(k in path for k in ('icon', 'mark')):
                score += 10
            if any(k in alt for k in ('logo', 'brand')):
                score += 25
            if any(k in cls for k in ('logo', 'brand')):
                score += 20
            if any(k in aria for k in ('logo', 'brand')):
                score += 20
            if any(k in title for k in ('logo', 'brand')):
                score += 15
            if path.endswith('.svg'):
                score += 15
            if path.endswith('.png'):
                score += 5
            self.logos.append((href, score))


def read_file_text(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def extract_array_objects(text: str, func_name: str) -> List[str]:
    start = text.find(f'function {func_name}')
    if start == -1:
        return []
    arr_start = text.find('[', start)
    if arr_start == -1:
        return []

    # find matching closing bracket
    depth = 0
    in_str = False
    quote = ''
    escape = False
    end = None
    for i in range(arr_start, len(text)):
        ch = text[i]
        if in_str:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == quote:
                in_str = False
            continue
        else:
            if ch in ('"', "'"):
                in_str = True
                quote = ch
                continue
            if ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    end = i
                    break
    if end is None:
        return []

    arr_text = text[arr_start + 1:end]

    # extract top-level objects
    objs: List[str] = []
    depth = 0
    in_str = False
    quote = ''
    escape = False
    obj_start = None
    for i, ch in enumerate(arr_text):
        if in_str:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == quote:
                in_str = False
            continue
        else:
            if ch in ('"', "'"):
                in_str = True
                quote = ch
                continue
            if ch == '{':
                if depth == 0:
                    obj_start = i
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0 and obj_start is not None:
                    objs.append(arr_text[obj_start:i + 1])
                    obj_start = None
    return objs


def parse_tool_sources(text: str) -> Dict[str, Dict[str, str]]:
    tools: Dict[str, Dict[str, str]] = {}
    for func_name in ('getMockTrendingTools', 'getMockTools'):
        for obj in extract_array_objects(text, func_name):
            id_match = re.search(r"\bid:\s*'([^']+)'", obj)
            website_match = re.search(r"\bwebsite:\s*'([^']+)'", obj)
            name_match = re.search(r"\bname:\s*'([^']+)'", obj)
            if not id_match or not website_match:
                continue
            tool_id = id_match.group(1).strip()
            website = website_match.group(1).strip()
            name = name_match.group(1).strip() if name_match else tool_id
            if tool_id and website and tool_id not in tools:
                tools[tool_id] = {'website': website, 'name': name}
    return tools


def fetch_url(url: str) -> Optional[bytes]:
    req = Request(url, headers={'User-Agent': USER_AGENT})
    try:
        with urlopen(req, timeout=TIMEOUT) as resp:
            return resp.read()
    except Exception:
        return None


def extract_inline_svg(html: str, keywords: List[str]) -> Optional[bytes]:
    lowered = html.lower()
    for kw in keywords:
        if kw and kw.lower() in lowered:
            pass
    # 捕获包含 logo/brand 或关键词的 svg 片段
    patterns = [
        r'<svg[^>]*(logo|brand)[^>]*>.*?</svg>',
    ]
    if keywords:
        safe_keywords = [re.escape(k.lower()) for k in keywords if k]
        if safe_keywords:
            patterns.append(r'<svg[^>]*(' + '|'.join(safe_keywords) + r')[^>]*>.*?</svg>')

    for pattern in patterns:
        for match in re.finditer(pattern, html, re.IGNORECASE | re.DOTALL):
            svg = match.group(0)
            if svg:
                return svg.encode('utf-8')

    return None


def fetch_icon_candidates(website: str, keywords: List[str]) -> Tuple[Optional[bytes], List[str]]:
    parsed = urlparse(website)
    if not parsed.scheme:
        website = 'https://' + website
        parsed = urlparse(website)
    origin = f"{parsed.scheme}://{parsed.netloc}"

    html_bytes = fetch_url(website)
    if not html_bytes:
        return None, [urljoin(origin, '/favicon.ico')]

    try:
        html = html_bytes.decode('utf-8', errors='ignore')
    except Exception:
        return None, [urljoin(origin, '/favicon.ico')]

    icon_parser = IconParser()
    logo_parser = LogoParser()
    try:
        icon_parser.feed(html)
        logo_parser.feed(html)
    except Exception:
        return None, [urljoin(origin, '/favicon.ico')]

    inline_svg = extract_inline_svg(html, keywords)

    def score(icon: Tuple[str, str, Optional[str]]) -> int:
        href, rel, sizes = icon
        score_val = 0
        if 'apple-touch-icon' in rel:
            score_val += 50
        if 'icon' in rel:
            score_val += 20
        if href.lower().endswith('.svg'):
            score_val += 10
        if sizes and sizes.lower() != 'any':
            size_vals = []
            for part in sizes.lower().split():
                if 'x' in part:
                    try:
                        w, h = part.split('x')
                        size_vals.append(int(w) * int(h))
                    except Exception:
                        continue
            if size_vals:
                score_val += max(size_vals) // 100
        return score_val

    candidates: List[str] = []
    if logo_parser.logos:
        for href, _score in sorted(logo_parser.logos, key=lambda x: x[1], reverse=True):
            candidates.append(urljoin(origin, href))
    for path in COMMON_LOGO_PATHS:
        candidates.append(urljoin(origin, path))
    if icon_parser.icons:
        for href, rel, sizes in sorted(icon_parser.icons, key=score, reverse=True):
            candidates.append(urljoin(origin, href))
    candidates.append(urljoin(origin, '/favicon.ico'))
    # 去重保持顺序
    seen = set()
    ordered = []
    for item in candidates:
        if item not in seen:
            ordered.append(item)
            seen.add(item)
    return inline_svg, ordered


def sniff_extension(data: bytes) -> str:
    if data.startswith(b'\x89PNG\r\n\x1a\n'):
        return '.png'
    if data.startswith(b'\xff\xd8'):
        return '.jpg'
    if data.startswith(b'RIFF') and b'WEBP' in data[:16]:
        return '.webp'
    head = data[:200].lstrip()
    if b'<svg' in head or b'<?xml' in head:
        return '.svg'
    if data[:4] in (b'\x00\x00\x01\x00', b'\x00\x00\x02\x00'):
        return '.ico'
    return ''


def detect_extension(url: str, content_type: Optional[str]) -> str:
    path = urlparse(url).path
    ext = os.path.splitext(path)[1].lower()
    if ext in ICON_EXTS:
        return ext
    if content_type:
        ct = content_type.split(';')[0].strip().lower()
        if ct in CONTENT_TYPE_TO_EXT:
            return CONTENT_TYPE_TO_EXT[ct]
    return '.png'


def download_icon(url: str) -> Optional[Tuple[bytes, str]]:
    req = Request(url, headers={'User-Agent': USER_AGENT})
    try:
        with urlopen(req, timeout=TIMEOUT) as resp:
            data = resp.read()
            sniffed = sniff_extension(data)
            if not sniffed:
                return None
            ext = sniffed or detect_extension(url, resp.headers.get('Content-Type'))
            return data, ext
    except Exception:
        return None


def write_mapping(mapping: Dict[str, str]):
    lines = [
        'export const toolIcons: Record<string, string> = {',
    ]
    for tool_id in sorted(mapping.keys()):
        lines.append(f"  '{tool_id}': '{mapping[tool_id]}',")
    lines.append('};')
    lines.append('')
    MAPPING_FILE.write_text('\n'.join(lines), encoding='utf-8')


def main():
    text = read_file_text(SUPABASE_FILE)
    tools = parse_tool_sources(text)
    if not tools:
        raise SystemExit('未解析到工具网站信息')

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    mapping: Dict[str, str] = {}
    needs_manual: List[str] = []

    for idx, (tool_id, info) in enumerate(sorted(tools.items())):
        website = info['website']
        name = info.get('name') or tool_id
        keywords = [tool_id.lower(), name.lower()]

        inline_svg, candidates = fetch_icon_candidates(website, keywords)
        if inline_svg:
            filename = f"{tool_id}.svg"
            (OUTPUT_DIR / filename).write_bytes(inline_svg)
            mapping[tool_id] = f"/tool-icons/{filename}"
            time.sleep(0.2)
            continue

        selected = None
        selected_url = None
        for icon_url in candidates:
            result = download_icon(icon_url)
            if result:
                selected = result
                selected_url = icon_url
                break

        if selected:
            data, ext = selected
            filename = f"{tool_id}{ext}"
            (OUTPUT_DIR / filename).write_bytes(data)
            mapping[tool_id] = f"/tool-icons/{filename}"
            if selected_url and ('favicon' in selected_url.lower() or ext == '.ico'):
                needs_manual.append(tool_id)
        else:
            mapping[tool_id] = f"/tool-icons/{tool_id}.svg"
            needs_manual.append(tool_id)

        time.sleep(0.2)

    write_mapping(mapping)
    REPORT_FILE.write_text(json.dumps(needs_manual, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"icons processed: {len(mapping)}")


if __name__ == '__main__':
    main()
