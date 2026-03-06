'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { toolsData } from '@/lib/content/tools-data';
import { useRouter } from 'next/navigation';
import type { Tool } from '@/types/tool';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // 过滤工具
  const filteredTools = useMemo(() => {
    if (!query.trim()) return toolsData.slice(0, 8);
    const lowerQuery = query.toLowerCase();
    return toolsData.filter(tool =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery)
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
        className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-bg-card border border-border-card rounded-lg text-text-secondary hover:text-text-primary hover:border-accent-cyan/50 transition-all"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">搜索</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-bg-secondary rounded border border-border-subtle">
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 搜索面板 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-32 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-bg-card/95 backdrop-blur-xl border border-border-glow rounded-2xl shadow-2xl overflow-hidden">
                {/* 搜索输入 */}
                <div className="flex items-center px-6 py-4 border-b border-border-subtle">
                  <Search className="w-5 h-5 text-text-muted mr-4" />
                  <input
                    type="text"
                    placeholder="搜索工具名称、描述或分类..."
                    className="flex-1 bg-transparent text-text-primary text-lg outline-none placeholder:text-text-muted"
                    value={query}
                    onChange={e => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    autoFocus
                  />
                  <kbd 
                    className="px-2 py-1 text-xs bg-bg-secondary rounded border border-border-subtle text-text-muted cursor-pointer hover:text-text-primary transition-colors"
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
                        {query.trim() ? `找到 ${filteredTools.length} 个结果` : '热门工具'}
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
                          <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border-card flex items-center justify-center text-lg font-bold text-accent-cyan">
                            {tool.name.charAt(0)}
                          </div>
                          
                          {/* 工具信息 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-text-primary truncate">
                                {tool.name}
                              </span>
                              <span className="px-2 py-0.5 text-xs bg-bg-secondary rounded-full text-text-secondary border border-border-subtle">
                                {tool.category}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary truncate mt-0.5">
                              {tool.description}
                            </p>
                          </div>

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
                      <p className="text-text-secondary">未找到相关工具</p>
                      <p className="text-sm text-text-muted mt-1">尝试其他关键词</p>
                    </div>
                  )}
                </div>

                {/* 底部提示 */}
                <div className="px-6 py-3 bg-bg-secondary/50 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-bg-card rounded border border-border-subtle">↑↓</kbd>
                      <span>导航</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-bg-card rounded border border-border-subtle">↵</kbd>
                      <span>选择</span>
                    </span>
                  </div>
                  <span className="font-mono">AI工具导航</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
