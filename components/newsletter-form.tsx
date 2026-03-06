'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'minimal';
}

export function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('请输入邮箱地址');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('请输入有效的邮箱地址');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 存储到localStorage（实际项目中应发送到后端）
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (subscribers.includes(email)) {
        setStatus('error');
        setMessage('您已经订阅过了');
        return;
      }
      
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      
      setStatus('success');
      setMessage('订阅成功！感谢您的关注');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('订阅失败，请稍后重试');
    }
  };

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="输入邮箱订阅"
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-white text-accent-warm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? '...' : '订阅'}
        </button>
        {status === 'success' && (
          <Check className="w-5 h-5 text-green-400" />
        )}
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-warm transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-accent-warm text-white font-medium rounded-xl hover:bg-accent-warm-hover disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? '订阅中...' : '立即订阅'}
        </button>
      </form>
    );
  }

  // default variant
  return (
    <div className="bg-gradient-to-br from-accent-warm/5 to-accent-cool/5 rounded-2xl p-8 border border-border-light">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent-warm/10 rounded-xl flex items-center justify-center">
          <Mail className="w-5 h-5 text-accent-warm" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">订阅 AI 工具周报</h3>
          <p className="text-sm text-text-secondary">每周精选最新 AI 工具和行业动态</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="输入您的邮箱地址"
            className="w-full pl-12 pr-4 py-3 bg-white border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-warm transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-accent-warm text-white font-medium rounded-xl hover:bg-accent-warm-hover disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              订阅中...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              立即订阅
            </>
          )}
        </button>
      </form>

      {status !== 'idle' && status !== 'loading' && (
        <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
          status === 'success' 
            ? 'bg-green-50 text-green-600 border border-green-200' 
            : 'bg-red-50 text-red-600 border border-red-200'
        }`}>
          {status === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="text-sm">{message}</span>
        </div>
      )}

      <p className="mt-4 text-xs text-text-muted text-center">
        订阅即表示您同意接收我们的邮件，您可以随时取消订阅
      </p>
    </div>
  );
}
