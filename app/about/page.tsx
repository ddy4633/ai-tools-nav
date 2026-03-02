import { Metadata } from 'next';
import { Users, Target, Award, Mail, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于我们 - AI工具导航 | 发现最好用的AI工具',
  description: '了解AI工具导航团队的使命和愿景。我们致力于发现和推荐真正好用的AI工具，帮助用户提升工作效率。',
  keywords: ['关于我们', 'AI工具导航', 'AI工具推荐', '团队介绍', 'AI工具平台'],
  alternates: {
    canonical: 'https://ai.poph163.com/about',
  },
  openGraph: {
    title: '关于我们 - AI工具导航',
    description: '了解AI工具导航团队的使命和愿景。我们致力于发现和推荐真正好用的AI工具。',
    type: 'website',
  },
};

// 团队数据
const teamMembers = [
  {
    name: '小明',
    role: '主编',
    bio: 'AI工具重度使用者，每天测试3-5个新工具，专注于AI聊天和效率工具领域',
    avatar: 'M',
    color: 'bg-accent-warm',
  },
  {
    name: '阿强',
    role: '技术编辑',
    bio: '前产品经理，专注效率工具和工作流优化，擅长AI编程和开发工具评测',
    avatar: 'Q',
    color: 'bg-accent-cool',
  },
  {
    name: 'Lisa',
    role: '创意总监',
    bio: '设计师出身，对AI图像和视频工具有独到见解，负责视觉设计和内容策划',
    avatar: 'L',
    color: 'bg-purple-500',
  },
];

// 核心价值观
const values = [
  {
    icon: Target,
    title: '精挑细选',
    description: '不追求数量，每个工具都经过实际使用验证，确保推荐质量',
  },
  {
    icon: Shield,
    title: '独立客观',
    description: '不接受付费推广，保持独立和客观，只为用户推荐真正好用的工具',
  },
  {
    icon: Award,
    title: '专业评测',
    description: '每个工具都进行深度评测，从功能、价格、易用性等多维度分析',
  },
  {
    icon: Globe,
    title: '全球视野',
    description: '关注全球AI工具发展动态，第一时间为用户带来最新的工具资讯',
  },
];

// 数据统计
const stats = [
  { value: '20+', label: '精选工具' },
  { value: '10+', label: '分类目录' },
  { value: '内测中', label: '用户规模' },
  { value: '持续优化', label: '体验迭代' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border-light">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-warm/5 via-transparent to-accent-cool/5" />
        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-warm/10 rounded-full text-accent-warm text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              关于我们
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              发现<span className="text-accent-warm">最好用</span>的AI工具
            </h1>
            
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              AI工具导航是一个专注于发现和推荐优质AI工具的平台。
              我们不追求收录所有工具，只推荐真正好用的，每个工具都经过实际使用验证。
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-surface-card rounded-2xl border border-border-light"
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent-warm mb-2">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">我们的使命</h2>
            <p className="text-text-secondary text-lg">让每个人都能找到适合自己的AI工具，提升工作和生活效率</p>
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed bg-surface-card rounded-2xl p-8 border border-border-light">
            <p className="mb-6">
              在AI工具爆发式增长的今天，每天都有数十款新的AI产品问世。面对海量的选择，
              用户往往感到困惑：哪个工具真正好用？哪个适合我的需求？哪个性价比最高？
            </p>
            
            <p className="mb-6">
              <strong className="text-text-primary">AI工具导航</strong>应运而生。我们的团队由AI工具重度使用者组成，
              每天测试和评测各类AI工具，从ChatGPT、Claude等AI聊天工具，到Midjourney、Stable Diffusion等AI绘画工具，
              再到GitHub Copilot、Cursor等AI编程工具，我们都有深入的使用体验。
            </p>
            
            <p>
              我们的目标不是成为最大的AI工具收录平台，而是成为<strong className="text-text-primary">最值得信赖</strong>的推荐平台。
              每一个收录的工具，我们都亲自测试；每一篇评测文章，我们都用心撰写。
              我们相信，只有真正好用的工具，才值得被推荐。
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">我们的原则</h2>
            <p className="text-text-secondary">坚持独立、客观、专业的评测标准</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex items-start gap-4 p-6 bg-surface-card rounded-xl border border-border-light hover:border-accent-warm/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-warm/10 flex items-center justify-center flex-shrink-0"
                >
                  <value.icon className="w-6 h-6 text-accent-warm" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">核心团队</h2>
            <p className="text-text-secondary">一群热爱AI工具的极客</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="text-center p-6 bg-surface-card rounded-2xl border border-border-light hover:border-accent-warm/30 transition-all"
              >
                <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-2xl font-bold text-white">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                <p className="text-accent-warm text-sm font-medium mb-3">{member.role}</p>
                <p className="text-text-secondary text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">联系我们</h2>
            <p className="text-text-secondary">有任何建议或想推荐工具？欢迎联系我们</p>
          </div>

          <div className="bg-surface-card rounded-2xl p-8 border border-border-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a
                href="mailto:hello@poph163.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-border-light hover:border-accent-warm/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-warm/10 flex items-center justify-center group-hover:bg-accent-warm/20 transition-colors"
                >
                  <Mail className="w-6 h-6 text-accent-warm" />
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">邮箱</p>
                  <p className="text-text-primary font-medium">hello@poph163.com</p>
                </div>
              </a>

              <Link
                href="/submit"
                className="flex items-center gap-4 p-4 rounded-xl border border-border-light hover:border-accent-cool/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-cool/10 flex items-center justify-center group-hover:bg-accent-cool/20 transition-colors"
                >
                  <Globe className="w-6 h-6 text-accent-cool" />
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">提交工具</p>
                  <p className="text-text-primary font-medium">推荐新工具</p>
                </div>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-border-light">
              <p className="text-center text-text-secondary text-sm">
                我们欢迎各种形式的合作，包括工具评测、内容合作、广告投放等。
                <br />
                请在邮件中详细说明您的需求和合作意向。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
