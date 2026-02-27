'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // 模拟提交
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-20 bg-bg-secondary relative overflow-hidden">
      {/* 装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse" />
            <span className="text-sm font-mono text-accent-yellow">NEWSLETTER</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-4"
          >
            STAY IN THE
            <span className="text-gradient-cyber"> LOOP</span>
          </h2>
          
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto font-mono"
          >
            Weekly digest of the best tools, directly to your inbox.
            <br />
            <span className="text-accent-cyan">1,000+</span> developers already subscribed.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 rounded-xl blur opacity-0 hover:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center bg-bg-card border border-border-glow rounded-xl overflow-hidden focus-within:border-accent-cyan/50 focus-within:shadow-glow-cyan transition-all"
              >
                <span className="pl-4 text-accent-cyan font-mono">@</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-4 bg-transparent text-text-primary font-mono placeholder:text-text-muted focus:outline-none"
                  disabled={status === 'loading' || status === 'success'}
                />
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="px-4 py-2 m-2 bg-accent-cyan/10 border border-accent-cyan/50 rounded-lg text-accent-cyan hover:bg-accent-cyan/20 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="animate-pulse">...</span>
                  ) : status === 'success' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-accent-cyan font-mono"
              >
                <Check className="w-4 h-4" />
                <span>Successfully subscribed!</span>
              </motion.div>
            )}
          </form>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm font-mono text-text-muted"
          >
            {['Weekly Updates', 'No Spam', 'Unsubscribe Anytime'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-cyan rounded-full"></span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
