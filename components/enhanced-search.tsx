'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useUiLanguage } from '@/components/providers/LanguageProvider';
import { getCategoryLabel, getToolDisplayName, getToolNameForLanguage } from '@/lib/tool-display';

interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
  type: 'tool' | 'history' | 'trending';
}

interface EnhancedSearchProps {
  tools: { id: string; name: string; description: string; category: string }[];
  onSearch: (query: string) => void;
  currentQuery: string;
}

// 简单的拼音转换映射（常用字）
const pinyinMap: Record<string, string> = {
  'ai': '爱艾挨哎',
  'chat': '聊天',
  'gpt': 'GPT',
  'tu': '图涂途突',
  'xie': '写谢鞋斜',
  'sheng': '生声省升',
  'cheng': '成程城承',
  'gongju': '工具',
  'bian': '编边变便',
  'ma': '码马吗妈',
  'yi': '一艺意义',
  'huitu': '绘图',
  'huihua': '绘画',
};

export function EnhancedSearch({ tools, onSearch, currentQuery }: EnhancedSearchProps) {
  const [query, setQuery] = useState(currentQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { language, copy } = useUiLanguage();

  // 同步外部查询参数（例如清除筛选）
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    if (query === currentQuery) {
      return;
    }

    const timer = window.setTimeout(() => {
      onSearch(query);
    }, 200);

    return () => window.clearTimeout(timer);
  }, [query, currentQuery, onSearch]);

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 保存搜索历史
  const saveSearchHistory = useCallback((term: string) => {
    if (!term.trim()) return;
    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }, [searchHistory]);

  // 生成搜索建议
  useEffect(() => {
    if (!query.trim()) {
      // 显示历史记录和热门搜索
      const historySuggestions: SearchSuggestion[] = searchHistory.slice(0, 5).map(term => ({
        id: `history-${term}`,
        name: term,
        category: '',
        type: 'history',
      }));
      
      const trendingSuggestions: SearchSuggestion[] = tools.slice(0, 3).map((tool) => ({
        id: `trend-${tool.id}`,
        name: getToolNameForLanguage(tool.name, language, 'surface'),
        category: getCategoryLabel(tool.category),
        type: 'trending' as const,
      }));

      setSuggestions([...historySuggestions, ...trendingSuggestions]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // 匹配工具名称和描述
    const matchedTools = tools
      .filter(tool => {
        const displayName = getToolDisplayName(tool.name);
        const categoryLabel = getCategoryLabel(tool.category);
        const nameMatch = tool.name.toLowerCase().includes(lowerQuery);
        const displayNameMatch = displayName.toLowerCase().includes(lowerQuery);
        const descMatch = tool.description.toLowerCase().includes(lowerQuery);
        const categoryMatch = tool.category.toLowerCase().includes(lowerQuery);
        const categoryLabelMatch = categoryLabel.toLowerCase().includes(lowerQuery);
        
        // 拼音匹配
        let pinyinMatch = false;
        for (const [pinyin, chars] of Object.entries(pinyinMap)) {
          if (lowerQuery.includes(pinyin)) {
            for (const char of chars) {
              if (tool.name.includes(char) || tool.description.includes(char)) {
                pinyinMatch = true;
                break;
              }
            }
          }
        }
        
        return nameMatch || displayNameMatch || descMatch || categoryMatch || categoryLabelMatch || pinyinMatch;
      })
      .slice(0, 8)
      .map(tool => ({
        id: tool.id,
        name: getToolNameForLanguage(tool.name, language, 'surface'),
        category: getCategoryLabel(tool.category),
        type: 'tool' as const,
      }));

    setSuggestions(matchedTools);
  }, [language, query, tools, searchHistory]);

  // 点击外部关闭建议
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearchHistory(query);
    }
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'tool') {
      // 直接跳转到工具详情
      router.push(`/tools/${suggestion.id}`);
    } else {
      setQuery(suggestion.name);
      saveSearchHistory(suggestion.name);
      onSearch(suggestion.name);
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  // 高亮匹配文本
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <mark key={i} className="bg-accent-warm/20 text-accent-warm font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={copy.search.placeholder}
            className="w-full pl-12 pr-12 py-3 bg-bg-secondary border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-warm transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-bg-primary rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-text-muted" />
            </button>
          )}
        </div>
      </form>

      {/* 搜索建议下拉框 */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-card rounded-xl shadow-lg border border-border-card overflow-hidden z-50">
          {suggestions.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {/* 分类标题 */}
              {query.trim() === '' && searchHistory.length > 0 && (
                <div className="px-4 py-2 text-xs text-text-muted bg-bg-secondary border-b border-border-subtle flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {copy.search.recentSearches}
                </div>
              )}
              {query.trim() === '' && (
                <div className="px-4 py-2 text-xs text-text-muted bg-bg-secondary border-b border-border-subtle flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {copy.search.popularSearches}
                </div>
              )}
              
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-bg-secondary transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    {suggestion.type === 'history' && <Clock className="w-4 h-4 text-text-muted" />}
                    {suggestion.type === 'trending' && <TrendingUp className="w-4 h-4 text-accent-warm" />}
                    {suggestion.type === 'tool' && <Search className="w-4 h-4 text-text-muted" />}
                    <span className="text-text-primary">
                      {highlightMatch(suggestion.name, query)}
                    </span>
                  </div>
                  {suggestion.category && (
                    <span className="text-xs font-mono text-accent-cyan bg-bg-secondary px-2 py-1 rounded border border-border-subtle">
                      {suggestion.category}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : query.trim() !== '' ? (
            <div className="px-4 py-8 text-center">
              <p className="text-text-muted">{copy.search.noMatchingTools}</p>
              <p className="text-sm text-text-muted mt-1">{copy.search.tryAnotherKeyword}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
