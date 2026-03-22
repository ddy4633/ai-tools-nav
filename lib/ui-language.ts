export type UiLanguage = 'en' | 'de' | 'ja' | 'ko' | 'zh';

export const UI_LANGUAGE_STORAGE_KEY = 'ai-tool-atlas.ui-language';
export const UI_LANGUAGE_COOKIE_KEY = 'ui_language';

export const uiLanguageOptions: Array<{
  code: UiLanguage;
  label: string;
  shortLabel: string;
  htmlLang: string;
}> = [
  { code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE', htmlLang: 'de' },
  { code: 'ja', label: '日本語', shortLabel: 'JA', htmlLang: 'ja' },
  { code: 'ko', label: '한국어', shortLabel: 'KO', htmlLang: 'ko' },
  { code: 'zh', label: '中文', shortLabel: 'ZH', htmlLang: 'zh-Hans' },
];

export type UiCopy = {
  languageLabel: string;
  nav: {
    directory: string;
    categories: string;
    trending: string;
    editorial: string;
    advertise: string;
    about: string;
    submit: string;
  };
  header: {
    promote: string;
    openMenu: string;
    closeMenu: string;
    taglineSecondary: string;
  };
  footer: {
    audienceBadge: string;
    navigation: string;
    connect: string;
    contactBlurb: string;
    creatorToolbox: string;
    audienceBlurb: string;
    bottomLeft: (siteName: string, year: number) => string;
    bottomRight: string;
  };
  legal: {
    privacy: string;
    terms: string;
    disclosure: string;
  };
  search: {
    trigger: string;
    placeholder: string;
    results: (count: number, hasQuery: boolean) => string;
    recentSearches: string;
    popularSearches: string;
    noMatchingTools: string;
    tryAnotherKeyword: string;
    navigate: string;
    open: string;
  };
  backToTop: string;
};

const uiCopyMap: Record<UiLanguage, UiCopy> = {
  en: {
    languageLabel: 'Language',
    nav: {
      directory: 'Directory',
      categories: 'Categories',
      trending: 'Trending',
      editorial: 'Editorial',
      advertise: 'Advertise',
      about: 'About',
      submit: 'Submit',
    },
    header: {
      promote: 'Promote',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      taglineSecondary: 'See the signal first, then decide where to click.',
    },
    footer: {
      audienceBadge: 'Interface language for global product discovery',
      navigation: 'Navigation',
      connect: 'Connect',
      contactBlurb:
        'Found a launch-worthy product, or want sponsored placement across discovery, category, trending, and editorial surfaces? Reach out here.',
      creatorToolbox: 'Creator toolbox',
      audienceBlurb:
        'Built for English-first discovery, with German, Japanese, Korean, and selected Chinese context layered in when it improves the decision.',
      bottomLeft: (siteName, year) => `© ${year} ${siteName}. Keep the signal clear and the disclosures honest.`,
      bottomRight: 'Made for people who really want to ship, not just browse.',
    },
    legal: {
      privacy: 'Privacy',
      terms: 'Terms',
      disclosure: 'Disclosure',
    },
    search: {
      trigger: 'Search tools',
      placeholder: 'Search by product, workflow, category, or use case...',
      results: (count, hasQuery) => (hasQuery ? `${count} results` : 'Popular picks'),
      recentSearches: 'Recent searches',
      popularSearches: 'Popular searches',
      noMatchingTools: 'No matching tools found',
      tryAnotherKeyword: 'Try another keyword or product name.',
      navigate: 'Navigate',
      open: 'Open',
    },
    backToTop: 'Back to top',
  },
  de: {
    languageLabel: 'Sprache',
    nav: {
      directory: 'Verzeichnis',
      categories: 'Kategorien',
      trending: 'Trend',
      editorial: 'Editorial',
      advertise: 'Werben',
      about: 'Über uns',
      submit: 'Einreichen',
    },
    header: {
      promote: 'Bewerben',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      taglineSecondary: 'Erst das Signal sehen, dann bewusst entscheiden, wohin du klickst.',
    },
    footer: {
      audienceBadge: 'Oberflächensprache für globale Produktsuche',
      navigation: 'Navigation',
      connect: 'Kontakt',
      contactBlurb:
        'Du hast ein launchfähiges Produkt oder möchtest gesponserte Platzierungen über Discovery-, Kategorie-, Trend- und Editorial-Flächen buchen? Melde dich hier.',
      creatorToolbox: 'Creator-Toolkit',
      audienceBlurb:
        'Für englisch geprägte Produktentdeckung gebaut, mit deutschem, japanischem, koreanischem und gezielt chinesischem Kontext, wenn er die Entscheidung verbessert.',
      bottomLeft: (siteName, year) => `© ${year} ${siteName}. Halte das Signal klar und die Offenlegung ehrlich.`,
      bottomRight: 'Für Menschen gebaut, die wirklich ausliefern wollen und nicht nur stöbern.',
    },
    legal: {
      privacy: 'Datenschutz',
      terms: 'AGB',
      disclosure: 'Offenlegung',
    },
    search: {
      trigger: 'Tools suchen',
      placeholder: 'Nach Produkt, Workflow, Kategorie oder Anwendungsfall suchen...',
      results: (count, hasQuery) => (hasQuery ? `${count} Treffer` : 'Beliebte Tipps'),
      recentSearches: 'Letzte Suchen',
      popularSearches: 'Beliebte Suchanfragen',
      noMatchingTools: 'Keine passenden Tools gefunden',
      tryAnotherKeyword: 'Versuche ein anderes Stichwort oder einen Produktnamen.',
      navigate: 'Navigieren',
      open: 'Öffnen',
    },
    backToTop: 'Nach oben',
  },
  ja: {
    languageLabel: '言語',
    nav: {
      directory: 'ディレクトリ',
      categories: 'カテゴリ',
      trending: 'トレンド',
      editorial: '編集記事',
      advertise: '掲載',
      about: '概要',
      submit: '掲載申請',
    },
    header: {
      promote: '掲載する',
      openMenu: 'メニューを開く',
      closeMenu: 'メニューを閉じる',
      taglineSecondary: 'まず本質を見てから、クリック先を決める。',
    },
    footer: {
      audienceBadge: 'グローバル向けプロダクト探索の表示言語',
      navigation: 'ナビゲーション',
      connect: '連絡先',
      contactBlurb:
        '公開に値するプロダクトがありますか。あるいは discovery、カテゴリ、トレンド、編集面でのスポンサー掲載を希望しますか。こちらからご連絡ください。',
      creatorToolbox: '制作ツール',
      audienceBlurb:
        '英語中心の発見体験をベースに、判断に役立つ場合のみドイツ語、日本語、韓国語、中国語の文脈を重ねています。',
      bottomLeft: (siteName, year) => `© ${year} ${siteName}. 情報の質と開示の誠実さを守ります。`,
      bottomRight: '眺めるだけでなく、本当に出荷したい人のために作られています。',
    },
    legal: {
      privacy: 'プライバシー',
      terms: '利用規約',
      disclosure: '開示',
    },
    search: {
      trigger: 'ツールを検索',
      placeholder: '製品名、ワークフロー、カテゴリ、用途で検索...',
      results: (count, hasQuery) => (hasQuery ? `${count} 件の結果` : '人気ピック'),
      recentSearches: '最近の検索',
      popularSearches: '人気の検索',
      noMatchingTools: '一致するツールが見つかりません',
      tryAnotherKeyword: '別のキーワードや製品名で試してください。',
      navigate: '移動',
      open: '開く',
    },
    backToTop: '上へ戻る',
  },
  ko: {
    languageLabel: '언어',
    nav: {
      directory: '디렉터리',
      categories: '카테고리',
      trending: '트렌딩',
      editorial: '에디토리얼',
      advertise: '광고',
      about: '소개',
      submit: '등록',
    },
    header: {
      promote: '홍보하기',
      openMenu: '메뉴 열기',
      closeMenu: '메뉴 닫기',
      taglineSecondary: '신호를 먼저 보고, 그다음 어디를 클릭할지 결정하세요.',
    },
    footer: {
      audienceBadge: '글로벌 제품 탐색을 위한 인터페이스 언어',
      navigation: '탐색',
      connect: '연락처',
      contactBlurb:
        '출시 가치가 있는 제품이 있거나 discovery, 카테고리, 트렌딩, 에디토리얼 영역에 스폰서 노출을 원한다면 여기로 연락해 주세요.',
      creatorToolbox: '크리에이터 툴박스',
      audienceBlurb:
        '영문 중심 탐색 경험을 기반으로, 판단에 도움이 될 때만 독일어, 일본어, 한국어, 일부 중국어 맥락을 더합니다.',
      bottomLeft: (siteName, year) => `© ${year} ${siteName}. 신호는 선명하게, 공개는 정직하게 유지합니다.`,
      bottomRight: '그냥 둘러보는 사람이 아니라 실제로 출시하려는 사람을 위해 만들었습니다.',
    },
    legal: {
      privacy: '개인정보',
      terms: '이용약관',
      disclosure: '고지',
    },
    search: {
      trigger: '도구 검색',
      placeholder: '제품, 워크플로, 카테고리 또는 사용 사례로 검색...',
      results: (count, hasQuery) => (hasQuery ? `${count}개 결과` : '인기 추천'),
      recentSearches: '최근 검색',
      popularSearches: '인기 검색',
      noMatchingTools: '일치하는 도구를 찾지 못했습니다',
      tryAnotherKeyword: '다른 키워드나 제품 이름으로 다시 시도해 보세요.',
      navigate: '이동',
      open: '열기',
    },
    backToTop: '맨 위로',
  },
  zh: {
    languageLabel: '语言',
    nav: {
      directory: '工具库',
      categories: '分类',
      trending: '热榜',
      editorial: '内容',
      advertise: '合作',
      about: '关于',
      submit: '提交',
    },
    header: {
      promote: '推广',
      openMenu: '打开菜单',
      closeMenu: '关闭菜单',
      taglineSecondary: '先看清信号，再决定点哪里。',
    },
    footer: {
      audienceBadge: '面向全球产品发现的界面语言',
      navigation: '导航',
      connect: '联系',
      contactBlurb:
        '如果你有值得发布的产品，或者想在 discovery、分类、热榜和内容位做赞助曝光，可以从这里联系。',
      creatorToolbox: '创作者工具箱',
      audienceBlurb:
        '整体以英文优先发现体验为主，只有在确实有助于判断时，才补充德文、日文、韩文和部分中文语境。',
      bottomLeft: (siteName, year) => `© ${year} ${siteName}。保持信号清晰，也保持披露诚实。`,
      bottomRight: '为真正想做产品和发版本的人准备，不是只给随便逛逛的人。',
    },
    legal: {
      privacy: '隐私',
      terms: '条款',
      disclosure: '披露',
    },
    search: {
      trigger: '搜索工具',
      placeholder: '按产品、工作流、分类或使用场景搜索...',
      results: (count, hasQuery) => (hasQuery ? `${count} 条结果` : '热门推荐'),
      recentSearches: '最近搜索',
      popularSearches: '热门搜索',
      noMatchingTools: '没有找到匹配的工具',
      tryAnotherKeyword: '试试别的关键词或产品名。',
      navigate: '切换',
      open: '打开',
    },
    backToTop: '返回顶部',
  },
};

export function resolveUiLanguage(value?: string | null): UiLanguage {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return 'en';
  }

  if (normalized.startsWith('de')) {
    return 'de';
  }

  if (normalized.startsWith('ja')) {
    return 'ja';
  }

  if (normalized.startsWith('ko')) {
    return 'ko';
  }

  if (normalized.startsWith('zh')) {
    return 'zh';
  }

  return 'en';
}

export function getUiCopy(language: UiLanguage) {
  return uiCopyMap[language] ?? uiCopyMap.en;
}

export function getUiLanguageMeta(language: UiLanguage) {
  return uiLanguageOptions.find((option) => option.code === language) ?? uiLanguageOptions[0];
}
