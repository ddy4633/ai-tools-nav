import { NewsletterForm } from '@/components/newsletter-form';

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          订阅 AI 工具周报
        </h2>
        <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
          每周一发送，精选本周最热门的 AI 工具、行业动态和实用教程。
          已有 1,000+ 订阅者，立即加入！
        </p>

        <div className="max-w-md mx-auto">
          <NewsletterForm variant="inline" />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            每周更新
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            随时退订
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            无垃圾邮件
          </div>
        </div>
      </div>
    </section>
  );
}
