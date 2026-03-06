'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Tool } from '@/types/tool';

interface LogoWallProps {
  tools: Tool[];
}

export default function LogoWall({ tools }: LogoWallProps) {
  // 过滤有icon的工具，取前16个
  const toolsWithIcon = tools
    .filter(tool => tool.icon)
    .slice(0, 16);

  if (toolsWithIcon.length < 8) return null;

  // 复制一份用于无缝滚动
  const duplicatedTools = [...toolsWithIcon, ...toolsWithIcon];

  return (
    <section className="py-12 bg-bg-secondary/50 relative overflow-hidden">
      {/* 顶部渐变遮罩 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题 */}
        <div className="text-center mb-8">
          <p className="text-sm font-mono text-text-muted">
            <span className="text-accent-cyan">$</span> ls tools/ | wc -l
            <span className="ml-2 text-text-secondary">{tools.length}+ tools indexed</span>
          </p>
        </div>

        {/* Logo墙 - 双层反向滚动 */}
        <div className="relative">
          {/* 左侧渐变遮罩 */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-secondary/50 to-transparent z-10 pointer-events-none" />
          {/* 右侧渐变遮罩 */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-secondary/50 to-transparent z-10 pointer-events-none" />

          {/* 第一行 - 向左滚动 */}
          <div className="relative overflow-hidden mb-6 group/row1">
            <div 
              className="flex gap-12 animate-scroll-left hover:[animation-play-state:paused]"
              style={{
                width: 'max-content',
              }}
            >
              {duplicatedTools.map((tool, index) => (
                <LogoItem key={`row1-${tool.id}-${index}`} tool={tool} />
              ))}
            </div>
          </div>

          {/* 第二行 - 向右滚动 */}
          <div className="relative overflow-hidden group/row2">
            <div 
              className="flex gap-12 animate-scroll-right hover:[animation-play-state:paused]"
              style={{
                width: 'max-content',
              }}
            >
              {[...duplicatedTools].reverse().map((tool, index) => (
                <LogoItem key={`row2-${tool.id}-${index}`} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
    </section>
  );
}

function LogoItem({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="flex-shrink-0 group/logo"
      title={tool.name}
    >
      <div className="relative w-12 h-12 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center transition-all duration-300 group-hover/logo:border-accent-cyan/50 group-hover/logo:shadow-glow-cyan group-hover/logo:scale-110">
        {tool.icon ? (
          <Image
            src={tool.icon}
            alt={tool.name}
            width={28}
            height={28}
            className="w-7 h-7 object-contain filter grayscale opacity-60 transition-all duration-300 group-hover/logo:grayscale-0 group-hover/logo:opacity-100"
            loading="lazy"
          />
        ) : (
          <span className="text-sm font-mono text-text-muted group-hover/logo:text-accent-cyan transition-colors">
            {tool.name[0]}
          </span>
        )}
      </div>
    </Link>
  );
}
