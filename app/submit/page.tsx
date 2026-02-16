'use client';

import { useState } from 'react';

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加实际的提交逻辑
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">🙏</div>
        <h1 className="text-2xl font-medium text-text-primary mb-4">感谢推荐</h1>
        <p className="text-text-secondary">
          我们会认真审核每个推荐，如果通过审核，工具将出现在网站上。
        </p>
        <a 
          href="/" 
          className="inline-block mt-8 text-accent-warm hover:text-accent-warm-hover"
        >
          返回首页 →
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium text-text-primary mb-4">推荐工具</h1>
      <p className="text-text-secondary mb-8">
        发现了一个好用的工具？告诉我们，让更多人知道它。
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            工具名称 *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-border-medium rounded-lg text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all"
            placeholder="例如：ChatGPT"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-text-primary mb-2">
            官方网站 *
          </label>
          <input
            type="url"
            id="website"
            required
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-border-medium rounded-lg text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all"
            placeholder="https://..."
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
            工具简介 *
          </label>
          <textarea
            id="description"
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-border-medium rounded-lg text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all resize-none"
            placeholder="简单介绍一下这个工具是做什么的"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-text-primary mb-2">
            推荐理由 *
          </label>
          <textarea
            id="reason"
            required
            rows={3}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-border-medium rounded-lg text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all resize-none"
            placeholder="为什么推荐这个工具？它解决了什么问题？"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-accent-warm text-white rounded-lg hover:bg-accent-warm-hover transition-colors font-medium"
        >
          提交推荐
        </button>

        <p className="text-xs text-text-muted text-center">
          提交即表示你同意我们审核后发布该推荐
        </p>
      </form>
    </div>
  );
}
