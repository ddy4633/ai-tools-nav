'use client';

import Link from 'next/link';

interface Editor {
  name: string;
  avatar: string;
  comment: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  reason: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  icon?: string;
}

interface EditorPick {
  id: string;
  tool: Tool;
  editor: Editor;
}

interface EditorPicksProps {
  picks?: EditorPick[];
}

const defaultPicks: EditorPick[] = [
  {
    id: '1',
    tool: {
      id: '1',
      name: 'ChatGPT',
      description: 'OpenAI 开发的大型语言模型',
      reason: '处理长文档时，它的理解能力让我惊讶',
      category: 'AI聊天',
      pricing_type: 'freemium',
    },
    editor: {
      name: '小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
      comment: '每天用，写代码和写文档都离不开它',
    },
  },
  {
    id: '2',
    tool: {
      id: '2',
      name: 'Claude',
      description: 'Anthropic 开发的 AI 助手',
      reason: '回答更深思熟虑，适合深度工作',
      category: 'AI聊天',
      pricing_type: 'freemium',
    },
    editor: {
      name: '阿强',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aqiang',
      comment: '比 ChatGPT 更稳重，适合专业场景',
    },
  },
  {
    id: '3',
    tool: {
      id: '3',
      name: 'Notion',
      description: 'All-in-one 工作空间',
      reason: '整理知识、管理项目，一个工具搞定',
      category: '效率工具',
      pricing_type: 'freemium',
    },
    editor: {
      name: '小红',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaohong',
      comment: '用了三年，是我的第二大脑',
    },
  },
];

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
  paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

export default function EditorPicks({ picks = [] }: EditorPicksProps) {
  const displayPicks = picks.length > 0 ? picks : defaultPicks;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">👋</span>
          <h2 className="text-2xl font-medium text-text-primary">编辑精选</h2>
          <span className="text-sm text-text-muted">本周我们最爱的工具</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPicks.map((pick) => {
            const pricing = pricingLabels[pick.tool.pricing_type];
            
            return (
              <div key={pick.id} className="bg-bg-primary rounded-xl p-6">
                <Link 
                  href={`/tools/${pick.tool.id}`}
                  className="block group"
                >
                  {/* 工具信息 */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-xl text-accent-warm font-medium">
                        {pick.tool.name[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors">
                        {pick.tool.name}
                      </h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${pricing.className}`}>
                        {pricing.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* 推荐理由 */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    「{pick.tool.reason}」
                  </p>
                  
                  {/* 编辑评语 */}
                  <div className="pt-4 border-t border-border-light flex items-center gap-3">
                    <img 
                      src={pick.editor.avatar} 
                      alt={pick.editor.name}
                      className="w-8 h-8 rounded-full bg-white"
                    />
                    <div>
                      <p className="text-sm text-text-secondary italic">"{pick.editor.comment}"</p>
                      <p className="text-xs text-text-muted">— {pick.editor.name}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
