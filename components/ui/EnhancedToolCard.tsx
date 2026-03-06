'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Tool } from '@/types/tool';
import ToolLogo from '@/components/ui/ToolLogo';

interface EnhancedToolCardProps {
  tool: Tool;
  index?: number;
}

const pricingLabels: Record<string, { text: string; className: string }> = {
  free: { text: 'FREE', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: 'PAID', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: 'FREEMIUM', className: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30' },
};

export default function EnhancedToolCard({ tool, index = 0 }: EnhancedToolCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D倾斜角度
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  // 使用spring动画使移动更平滑
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // 光晕位置
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 归一化到 -0.5 到 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const pricingType = tool.pricing_type || tool.pricingType || 'freemium';
  const pricing = pricingLabels[pricingType] || pricingLabels.freemium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <Link href={`/tools/${tool.id}`} className="group block relative">
        {/* 外部发光边框 */}
        <motion.div 
          className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.5) 0%, rgba(131, 56, 236, 0.3) 50%, rgba(255, 0, 110, 0.5) 100%)',
            filter: 'blur(8px)',
          }}
        />

        {/* 主卡片 - 3D倾斜效果 */}
        <motion.div
          className="relative bg-bg-card border border-border-card rounded-xl p-5 h-full overflow-hidden"
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ 
            scale: 1.02,
            borderColor: 'rgba(0, 245, 212, 0.4)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* 内部鼠标跟随光晕 */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([latestX, latestY]) => 
                  `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(0, 245, 212, 0.15) 0%, transparent 50%)`
              ),
            }}
          />

          {/* 渐变边框线 */}
          <div 
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.3) 0%, rgba(131, 56, 236, 0.2) 50%, rgba(255, 0, 110, 0.3) 100%)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />

          {/* 内容区域 */}
          <div className="relative z-10">
            {/* 头部：图标 + 名称 */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <ToolLogo
                  name={tool.name}
                  icon={tool.icon}
                  size={32}
                  alt={`${tool.name} logo`}
                  wrapperClassName="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex-shrink-0"
                  imageClassName="w-8 h-8"
                  textClassName="text-xl text-accent-cyan"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-300 truncate">
                  {tool.name}
                </h3>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-mono rounded border transition-all duration-300 ${pricing.className}`}
                >
                  {pricing.text}
                </span>
              </div>
            </div>

            {/* 描述 */}
            <p className="text-text-secondary text-sm leading-relaxed mb-4 font-mono line-clamp-2 group-hover:text-text-primary transition-colors duration-300"
            >
              {tool.reason || tool.description}
            </p>

            {/* 底部分类 */}
            <div className="flex items-center justify-between pt-4 border-t border-border-subtle group-hover:border-accent-cyan/20 transition-colors duration-300"
            >
              <span className="text-xs font-mono text-text-muted group-hover:text-text-secondary transition-colors duration-300"
              >
                {`// ${tool.category}`}
              </span>
              <motion.span 
                className="text-xs font-mono text-accent-cyan opacity-0 group-hover:opacity-100 flex items-center gap-1"
                initial={{ x: 10 }}
                whileHover={{ x: 0 }}
              >
                [VIEW] →
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
