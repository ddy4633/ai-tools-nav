'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { toolsData } from '@/lib/content/tools-data';
import { useRouter } from 'next/navigation';
import { useUiLanguage } from '@/components/providers/LanguageProvider';
import type { Tool } from '@/types/tool';
import ToolLogo from '@/components/ui/ToolLogo';
import { getCategoryLabel, getToolDisplayName, getToolNameForLanguage } from '@/lib/tool-display';
import { rankToolsForDiscovery } from '@/lib/tool-ranking';

const discoveryTools = rankToolsForDiscovery(toolsData);

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { language, copy } = useUiLanguage();

  // 过滤工具
  const filteredTools = useMemo(() => {
    if (!query.trim()) return discoveryTools.slice(0, 8);
    const lowerQuery = query.toLowerCase();
    return discoveryTools.filter(tool =>
      getToolDisplayName(tool.name).toLowerCase().includes(lowerQuery) ||
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery) ||
      getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug).toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [query]);

  const navigateToTool = useCallback((tool: Tool) => {
    router.push(`/tools/${tool.id}`);
    setIsOpen(false);
    setQuery('');
  }, [router]);

  // 监听键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K 打开/关闭
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // ESC 关闭
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      // 键盘导航
      if (isOpen) {
        if (e.key === 'ArrowDown' && filteredTools.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredTools.length);
        }
        if (e.key === 'ArrowUp' && filteredTools.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredTools.length) % filteredTools.length);
        }
        if (e.key === 'Enter' && filteredTools[selectedIndex]) {
          e.preventDefault();
          navigateToTool(filteredTools[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredTools, isOpen, navigateToTool, selectedIndex]);


  return (
    <>
      {/* 触发按钮 - 显示在Header中 */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary transition hover:border-accent-cyan/28 hover:text-text-primary"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">{copy.search.trigger}</span>
        <kbd className="ml-1 rounded-full border border-white/10 bg-black/10 px-2 py-0.5 text-[11px] text-text-muted">
          ⌘K
        </kbd>
      </button>

      {/* 命令面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 搜索面板 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed left-1/2 top-28 z-50 w-full max-w-2xl -translate-x-1/2 px-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-bg-card/95 shadow-2xl backdrop-blur-xl">
                {/* 搜索输入 */}
                <div className="flex items-center border-b border-white/8 px-6 py-4">
                  <Search className="w-5 h-5 text-text-muted mr-4" />
                  <input
                    type="text"
                    placeholder={copy.search.placeholder}
                    className="flex-1 bg-transparent text-text-primary text-lg outline-none placeholder:text-text-muted"
                    value={query}
                    onChange={e => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    autoFocus
                  />
                  <kbd 
                    className="cursor-pointer rounded-full border border-white/10 bg-black/10 px-2 py-1 text-xs text-text-muted transition-colors hover:text-text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    ESC
                  </kbd>
                </div>

                {/* 搜索结果 */}
                <div className="max-h-[400px] overflow-y-auto py-2">
                  {filteredTools.length > 0 ? (
                    <div className="px-2">
                      <div className="px-4 py-2 text-xs font-mono text-text-muted">
                        {copy.search.results(filteredTools.length, Boolean(query.trim()))}
                      </div>
                      {filteredTools.map((tool, index) => (
                        <motion.button
                          key={tool.id}
                          onClick={() => navigateToTool(tool)}
                          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all ${
                            index === selectedIndex 
                              ? 'bg-accent-cyan/10 border border-accent-cyan/30' 
                              : 'hover:bg-bg-hover'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* 工具图标 */}
                          {(() => {
                            const displayName = getToolNameForLanguage(tool.name, language, 'surface');
                            const categoryLabel = getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug);

                            return (
                              <>
                          <ToolLogo
                            name={displayName}
                            icon={tool.icon}
                            size={24}
                            alt={`${displayName} logo`}
                            wrapperClassName="h-10 w-10 rounded-xl border border-white/10 bg-white/5"
                            imageClassName="h-6 w-6"
                            textClassName="text-lg text-accent-cyan"
                          />
                          
                          {/* 工具信息 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-text-primary truncate">
                                {displayName}
                              </span>
                              <span className="rounded-full border border-white/10 bg-black/10 px-2 py-0.5 text-xs text-text-secondary">
                                {categoryLabel}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary truncate mt-0.5">
                              {tool.description}
                            </p>
                          </div>
                              </>
                            );
                          })()}

                          {/* 箭头指示 */}
                          {index === selectedIndex && (
                            <ArrowRight className="w-4 h-4 text-accent-cyan" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-12 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-secondary flex items-center justify-center">
                        <Search className="w-8 h-8 text-text-muted" />
                      </div>
                      <p className="text-text-secondary">{copy.search.noMatchingTools}</p>
                      <p className="text-sm text-text-muted mt-1">{copy.search.tryAnotherKeyword}</p>
                    </div>
                  )}
                </div>

                {/* 底部提示 */}
                <div className="flex items-center justify-between border-t border-white/8 bg-bg-secondary/50 px-6 py-3 text-xs text-text-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-white/10 bg-bg-card px-1.5 py-0.5">↑↓</kbd>
                      <span>{copy.search.navigate}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-white/10 bg-bg-card px-1.5 py-0.5">↵</kbd>
                      <span>{copy.search.open}</span>
                    </span>
                  </div>
                  <span className="font-mono">AI Tool Atlas</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
