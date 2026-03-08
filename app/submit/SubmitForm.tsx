'use client';

import NextLink from 'next/link';
import { useState } from 'react';
import {
  Send,
  Check,
  Loader2,
  Tag,
  Layers,
  Link as LinkIcon,
  FileText,
  Sparkles,
  Mail,
  User,
  Building2,
  Clock3,
  Megaphone,
} from 'lucide-react';
import { isBusinessSubmission, submitToolSubmissionApi, validateSubmissionEmail } from '@/lib/submission/client';
import type { SubmissionPlan } from '@/lib/submission/types';

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
  'macOS', 'Windows', 'SaaS', 'GPT-4', 'Midjourney', 'Stable Diffusion',
];

const submissionPlans: Array<{
  value: SubmissionPlan;
  title: string;
  description: string;
  helper: string;
  icon: typeof Sparkles;
}> = [
  {
    value: 'free',
    title: '免费收录',
    description: '进入常规审核队列，适合自然推荐。',
    helper: '标准审核',
    icon: Sparkles,
  },
  {
    value: 'priority',
    title: '加急评估',
    description: '适合活动排期、发布周或需要更快反馈的工具。',
    helper: '商务加急',
    icon: Clock3,
  },
  {
    value: 'sponsored',
    title: '赞助置顶',
    description: '适合首页、分类页、专题页的商业化曝光。',
    helper: '商务投放',
    icon: Megaphone,
  },
];

const budgetOptions = ['< 3,000 元', '3,000 - 10,000 元', '10,000 - 30,000 元', '30,000 元以上'];

interface SubmitFormData {
  name: string;
  website: string;
  description: string;
  category: string;
  tags: string[];
  reason: string;
  submitterName: string;
  submitterEmail: string;
  companyName: string;
  submissionType: SubmissionPlan;
  budgetRange: string;
}

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SubmitFormData, string>>>({});
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<SubmitFormData>({
    name: '',
    website: '',
    description: '',
    category: '',
    tags: [],
    reason: '',
    submitterName: '',
    submitterEmail: '',
    companyName: '',
    submissionType: 'free',
    budgetRange: '',
  });
  const [tagInput, setTagInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SubmitFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入工具名称';
    } else if (formData.name.length < 2) {
      newErrors.name = '工具名称至少需要 2 个字符';
    }

    if (!formData.website.trim()) {
      newErrors.website = '请输入官方网站链接';
    } else {
      try {
        new URL(formData.website);
      } catch {
        newErrors.website = '请输入有效的 URL 链接';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = '请输入工具简介';
    } else if (formData.description.length < 10) {
      newErrors.description = '简介至少需要 10 个字符';
    }

    if (!formData.category) {
      newErrors.category = '请选择一个分类';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = '请输入推荐理由';
    } else if (formData.reason.length < 10) {
      newErrors.reason = '推荐理由至少需要 10 个字符';
    }

    if (!formData.submitterEmail.trim()) {
      newErrors.submitterEmail = '请输入联系邮箱';
    } else if (!validateSubmissionEmail(formData.submitterEmail.trim())) {
      newErrors.submitterEmail = '请输入有效的联系邮箱';
    }

    if (isBusinessSubmission(formData.submissionType) && !formData.budgetRange) {
      newErrors.budgetRange = '请选择预算区间，便于商务快速评估';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SubmitFormData, value: string) => {
    setFormData((previous) => {
      const next = { ...previous, [field]: value };

      if (field === 'submissionType' && value === 'free') {
        next.budgetRange = '';
      }

      return next;
    });

    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await submitToolSubmissionApi({
        ...formData,
        name: formData.name.trim(),
        website: formData.website.trim(),
        description: formData.description.trim(),
        reason: formData.reason.trim(),
        submitterName: formData.submitterName.trim(),
        submitterEmail: formData.submitterEmail.trim(),
        companyName: formData.companyName.trim(),
      });

      if (!result.success) {
        setSubmitError(result.message || '提交失败，请稍后重试');
        return;
      }

      setSuccessMessage(result.message || '提交成功');
      setSubmitted(true);
    } catch {
      setSubmitError('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (value && !formData.tags.includes(value) && formData.tags.length < 5) {
      setFormData((previous) => ({ ...previous, tags: [...previous.tags, value] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((previous) => ({
      ...previous,
      tags: previous.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleQuickTag = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData((previous) => ({ ...previous, tags: [...previous.tags, tag] }));
    }
  };

  if (submitted) {
    const isBusiness = isBusinessSubmission(formData.submissionType);

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center bg-surface-card rounded-2xl p-8 sm:p-12 border border-border-light shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">提交成功</h1>
          <p className="text-text-secondary text-lg mb-2">
            已收到 <strong className="text-accent-warm">{formData.name}</strong> 的{isBusiness ? '商务合作' : '收录推荐'}信息
          </p>
          <p className="text-text-muted mb-2">{successMessage}</p>
          <p className="text-text-muted mb-8">
            {isBusiness
              ? '我们会通过你填写的邮箱进一步沟通排期、预算和合作位。'
              : '审核结果会通过你填写的邮箱同步。'}
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
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-warm/10 text-accent-warm rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">提交工具 / 商务合作</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">让更多人发现你的 AI 工具</h1>
        <p className="text-text-secondary max-w-xl mx-auto">
          支持免费收录、加急评估和赞助置顶三种模式。免费提交进入审核队列，商务方案会优先进入合作沟通。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-card rounded-2xl p-6 sm:p-8 border border-border-light shadow-lg">
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
            <Sparkles className="w-4 h-4 text-accent-warm" />
            收录方案 <span className="text-red-500">*</span>
          </label>
          <div className="grid sm:grid-cols-3 gap-3">
            {submissionPlans.map((plan) => {
              const Icon = plan.icon;
              const active = formData.submissionType === plan.value;
              return (
                <button
                  key={plan.value}
                  type="button"
                  onClick={() => handleInputChange('submissionType', plan.value)}
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    active
                      ? 'border-accent-warm bg-accent-warm/10 shadow-sm'
                      : 'border-border-medium hover:border-accent-warm/50 hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? 'bg-accent-warm text-white' : 'bg-surface-base text-accent-warm'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{plan.title}</p>
                      <p className="text-xs text-accent-warm">{plan.helper}</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{plan.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Sparkles className="w-4 h-4 text-accent-warm" />
            工具名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 bg-surface-base border rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all ${
              errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="例如：ChatGPT、Midjourney、Cursor"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="website" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <LinkIcon className="w-4 h-4 text-accent-warm" />
            官方网站 <span className="text-red-500">*</span>
          </label>
          <input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className={`w-full px-4 py-3 bg-surface-base border rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all ${
              errors.website ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="https://example.com"
          />
          {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
        </div>

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

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Tag className="w-4 h-4 text-accent-warm" />
            标签 <span className="text-text-muted font-normal">(可选，最多 5 个)</span>
          </label>

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

          <div className="flex flex-wrap gap-2 mb-3">
            {popularTags.filter((tag) => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (
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

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
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

        <div className="mb-6">
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

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="submitterName" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
              <User className="w-4 h-4 text-accent-warm" />
              联系人 <span className="text-text-muted font-normal">(可选)</span>
            </label>
            <input
              id="submitterName"
              type="text"
              value={formData.submitterName}
              onChange={(e) => handleInputChange('submitterName', e.target.value)}
              className="w-full px-4 py-3 bg-surface-base border border-border-medium rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all"
              placeholder="你的姓名或团队称呼"
            />
          </div>
          <div>
            <label htmlFor="submitterEmail" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
              <Mail className="w-4 h-4 text-accent-warm" />
              联系邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              id="submitterEmail"
              type="email"
              value={formData.submitterEmail}
              onChange={(e) => handleInputChange('submitterEmail', e.target.value)}
              className={`w-full px-4 py-3 bg-surface-base border rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all ${
                errors.submitterEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
              }`}
              placeholder="name@company.com"
            />
            {errors.submitterEmail && <p className="mt-1 text-sm text-red-500">{errors.submitterEmail}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="companyName" className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Building2 className="w-4 h-4 text-accent-warm" />
            公司 / 团队 <span className="text-text-muted font-normal">(可选)</span>
          </label>
          <input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-4 py-3 bg-surface-base border border-border-medium rounded-xl text-text-primary focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all"
            placeholder="例如：OpenAI / 某某创业团队"
          />
        </div>

        {isBusinessSubmission(formData.submissionType) && (
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
              <Megaphone className="w-4 h-4 text-accent-warm" />
              预算区间 <span className="text-red-500">*</span>
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleInputChange('budgetRange', option)}
                  className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                    formData.budgetRange === option
                      ? 'border-accent-warm bg-accent-warm/10 text-accent-warm'
                      : 'border-border-medium hover:border-accent-warm/50 hover:bg-surface-hover text-text-secondary'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.budgetRange && <p className="mt-2 text-sm text-red-500">{errors.budgetRange}</p>}
            <p className="mt-2 text-xs text-text-muted">
              仅用于商务初步评估，不会在前台公开展示。
            </p>
          </div>
        )}

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
              {isBusinessSubmission(formData.submissionType) ? '提交商务线索' : '提交推荐'}
            </>
          )}
        </button>

        {submitError && (
          <p className="text-sm text-red-600 text-center mt-3">{submitError}</p>
        )}

        <p className="text-xs text-text-muted text-center mt-4 leading-relaxed">
          提交后会进入站点 API 流程，可接 webhook 或内部 CRM；免费收录走审核，商务方案会优先通过邮箱联系。
        </p>
      </form>
    </div>
  );
}
