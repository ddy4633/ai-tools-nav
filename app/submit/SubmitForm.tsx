'use client';

import NextLink from 'next/link';
import { useState } from 'react';
import { Send, Check, Loader2, Tag, Layers, Link, FileText, Sparkles } from 'lucide-react';

const categories = [
  { value: 'writing', label: 'AI 写作', icon: '✍️' },
  { value: 'image', label: 'AI 绘画', icon: '🎨' },
  { value: 'code', label: '编程开发', icon: '💻' },
  { value: 'chat', label: 'AI 对话', icon: '💬' },
  { value: 'video', label: '视频创作', icon: '🎬' },
  { value: 'audio', label: '音频处理', icon: '🎵' },
  { value: 'productivity', label: '效率工具', icon: '⚡' },
  { value: 'design', label: '设计工具', icon: '🎯' },
  { value: 'other', label: '其他', icon: '📦' },
];

const popularTags = [
  '免费', '开源', '在线', 'API', '移动端', 'Chrome插件', 
  'macOS', 'Windows', 'SaaS', 'GPT-4', 'Midjourney', 'Stable Diffusion'
];

interface FormData {
  name: string;
  website: string;
  description: string;
  category: string;
  tags: string[];
  reason: string;
}

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    website: '',
    description: '',
    category: '',
    tags: [],
    reason: '',
  });
  const [tagInput, setTagInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入工具名称';
    } else if (formData.name.length < 2) {
      newErrors.name = '工具名称至少需要2个字符';
    }

    if (!formData.website.trim()) {
      newErrors.website = '请输入官方网站链接';
    } else {
      try {
        new URL(formData.website);
      } catch {
        newErrors.website = '请输入有效的URL链接';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = '请输入工具简介';
    } else if (formData.description.length < 10) {
      newErrors.description = '简介至少需要10个字符';
    }

    if (!formData.category) {
      newErrors.category = '请选择一个分类';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = '请输入推荐理由';
    } else if (formData.reason.length < 10) {
      newErrors.reason = '推荐理由至少需要10个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const storageKey = 'toolSubmissions';
      const payload = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      let list: typeof payload[] = [];
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            list = parsed as typeof payload[];
          }
        } catch {
          list = [];
        }
      }

      list.unshift(payload);
      window.localStorage.setItem(storageKey, JSON.stringify(list));
      setSubmitted(true);
    } catch {
      setSubmitError('本地保存失败，请检查浏览器存储权限');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleQuickTag = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center bg-surface-card rounded-2xl p-8 sm:p-12 border border-border-light shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">感谢你的推荐！</h1>
          <p className="text-text-secondary text-lg mb-2">
            已在本地保存对 <strong className="text-accent-warm">{formData.name}</strong> 的推荐
          </p>
          <p className="text-text-muted mb-8">
            当前为静态版本，暂不支持在线提交
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NextLink
              href="/tools" 
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-warm text-white rounded-xl hover:bg-accent-warm-hover transition-all font-medium"
            >
              浏览工具
            </NextLink>
            <NextLink
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-surface-base border border-border-medium text-text-primary rounded-xl hover:bg-surface-hover transition-all font-medium"
            >
              返回首页
            </NextLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-warm/10 rounded-full text-accent-warm text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          共同发现优秀工具
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          推荐 AI 工具
        </h1>
        <p className="text-text-secondary text-lg max-w-md mx-auto">
          发现了好用的 AI 工具？告诉我们，让更多人受益
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-surface-card rounded-2xl p-6 sm:p-8 border border-border-light shadow-sm">
        {/* Tool Name */}
        <div className="mb-6">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Sparkles className="w-4 h-4 text-accent-warm" />
            工具名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 bg-surface-base border rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all ${
              errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="例如：ChatGPT、Midjourney"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Website */}
        <div className="mb-6">
          <label htmlFor="website" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Link className="w-4 h-4 text-accent-warm" />
            官方网站 <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="website"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className={`w-full px-4 py-3 bg-surface-base border rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all ${
              errors.website ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="https://example.com"
          />
          {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
            <Layers className="w-4 h-4 text-accent-warm" />
            工具分类 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleInputChange('category', cat.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  formData.category === cat.value
                    ? 'border-accent-warm bg-accent-warm/10 text-accent-warm'
                    : 'border-border-medium hover:border-accent-warm/50 hover:bg-surface-hover'
                }`}
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
          {errors.category && <p className="mt-2 text-sm text-red-500">{errors.category}</p>}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <FileText className="w-4 h-4 text-accent-warm" />
            工具简介 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={`w-full px-4 py-3 bg-surface-base border rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all resize-none ${
              errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="简单介绍一下这个工具的主要功能和用途"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          <p className="mt-1 text-xs text-text-muted text-right">{formData.description.length} / 500</p>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Tag className="w-4 h-4 text-accent-warm" />
            标签 <span className="text-text-muted font-normal">(可选，最多5个)</span>
          </label>
          
          {/* Selected Tags */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent-warm/10 text-accent-warm rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-accent-warm-hover"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {popularTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTag(tag)}
                disabled={formData.tags.length >= 5}
                className="px-3 py-1 text-xs bg-surface-base border border-border-medium rounded-full text-text-secondary hover:border-accent-warm hover:text-accent-warm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + {tag}
              </button>
            ))}
          </div>

          {/* Custom Tag Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              disabled={formData.tags.length >= 5}
              className="flex-1 px-4 py-2 bg-surface-base border border-border-medium rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all disabled:opacity-50"
              placeholder="自定义标签，按回车添加"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={formData.tags.length >= 5 || !tagInput.trim()}
              className="px-4 py-2 bg-surface-base border border-border-medium rounded-xl text-text-primary hover:bg-surface-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              添加
            </button>
          </div>
        </div>

        {/* Reason */}
        <div className="mb-8">
          <label htmlFor="reason" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Send className="w-4 h-4 text-accent-warm" />
            推荐理由 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            rows={4}
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            className={`w-full px-4 py-3 bg-surface-base border rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all resize-none ${
              errors.reason ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="为什么推荐这个工具？它解决了什么问题？有什么独特之处？"
          />
          {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
          <p className="mt-1 text-xs text-text-muted text-right">{formData.reason.length} / 1000</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-accent-warm text-white rounded-xl hover:bg-accent-warm-hover transition-all font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-accent-warm/25"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              提交中...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              提交推荐
            </>
          )}
        </button>

        {submitError && (
          <p className="text-sm text-red-600 text-center mt-3">{submitError}</p>
        )}

        <p className="text-xs text-text-muted text-center mt-4">
          当前为静态版本，提交内容仅保存在本地浏览器
        </p>
      </form>
    </div>
  );
}
