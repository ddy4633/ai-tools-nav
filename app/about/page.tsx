export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium text-text-primary mb-8">关于我们</h1>
      
      <div className="prose prose-lg text-text-secondary">
        <p className="mb-6">
          「好工具」是一个简单的工具推荐网站。
        </p>
        
        <p className="mb-6">
          我们不追求收录所有工具，只推荐真正好用的。每个工具都经过实际使用，
          确保值得你的时间。
        </p>
        
        <h2 className="text-xl font-medium text-text-primary mt-12 mb-4">我们的原则</h2>
        
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li>只推荐我们用过的工具</li>
          <li>不接收付费推广</li>
          <li>保持独立和客观</li>
        </ul>
        
        <h2 className="text-xl font-medium text-text-primary mt-12 mb-4">联系我们</h2>
        
        <p>
          有任何建议或想推荐工具？欢迎发送邮件到{' '}
          <a 
            href="mailto:hello@poph163.com" 
            className="text-accent-warm hover:text-accent-warm-hover"
          >
            hello@poph163.com
          </a>
        </p>
      </div>
    </div>
  );
}
