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
  { value: 'writing', label: 'AI Writing', icon: '✍️' },
  { value: 'image', label: 'Image Generation', icon: '🎨' },
  { value: 'code', label: 'Coding', icon: '💻' },
  { value: 'chatbot', label: 'AI Chat', icon: '💬' },
  { value: 'video', label: 'Video', icon: '🎬' },
  { value: 'audio', label: 'Audio', icon: '🎵' },
  { value: 'productivity', label: 'Productivity', icon: '⚡' },
  { value: 'design', label: 'Design', icon: '🎯' },
  { value: 'knowledge', label: 'Knowledge', icon: '📚' },
  { value: 'data', label: 'Data', icon: '📊' },
  { value: 'other', label: 'Other', icon: '📦' },
];

const popularTags = [
  'Free',
  'Open source',
  'Web app',
  'API',
  'Mobile',
  'Chrome extension',
  'macOS',
  'Windows',
  'SaaS',
  'AI agent',
  'Enterprise-ready',
  'Team collaboration',
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
    title: 'Free listing',
    description: 'Join the standard review queue for organic directory placement.',
    helper: 'Standard queue',
    icon: Sparkles,
  },
  {
    value: 'priority',
    title: 'Priority review',
    description: 'Best for launches, campaigns, and teams that need faster editorial review.',
    helper: '48-hour priority',
    icon: Clock3,
  },
  {
    value: 'sponsored',
    title: 'Sponsored placement',
    description: 'Best for homepage, category, ranking, or editorial visibility packages.',
    helper: 'Commercial route',
    icon: Megaphone,
  },
];

const budgetOptions = ['Under $500', '$500 - $2,000', '$2,000 - $5,000', '$5,000+'];

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

function normalizeSubmitError(message?: string) {
  const fallback = 'Submission failed. Please try again in a moment.';

  if (!message) {
    return fallback;
  }

  const rules: Array<[RegExp, string]> = [
    [/trusted|来源/i, 'Request blocked. Please submit through the live site form.'],
    [/频繁|too frequent|429/i, 'Too many attempts from this network. Please try again later.'],
    [/tool name|工具名称/i, 'Enter a valid product name.'],
    [/官网|website|url/i, 'Enter a valid product URL.'],
    [/description|简介/i, 'Add a longer product summary so the team can review it properly.'],
    [/category|分类/i, 'Choose the category that best matches your product.'],
    [/reason|推荐理由/i, 'Explain why this product deserves to be listed.'],
    [/email|邮箱/i, 'Enter a valid contact email.'],
    [/budget|预算/i, 'Select a budget range so the commercial team can respond faster.'],
    [/not configured|未配置|channel/i, 'The submission channel is not configured yet. Please contact us directly by email.'],
  ];

  const matched = rules.find(([pattern]) => pattern.test(message));
  return matched ? matched[1] : message;
}

function getSuccessMessage(submissionType: SubmissionPlan) {
  if (isBusinessSubmission(submissionType)) {
    return 'Your request is in. We will follow up by email with timing, pricing, and placement options.';
  }

  return 'Your product is now in the review queue. We will email you after the editorial review.';
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
  const [website2, setWebsite2] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SubmitFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Enter the product name.';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Use at least 2 characters for the product name.';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Enter the official product URL.';
    } else {
      try {
        new URL(formData.website);
      } catch {
        newErrors.website = 'Enter a valid URL.';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Add a short product summary.';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Use at least 10 characters so the team can understand the product.';
    }

    if (!formData.category) {
      newErrors.category = 'Choose a category.';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Tell us why this product should be featured.';
    } else if (formData.reason.length < 10) {
      newErrors.reason = 'Use at least 10 characters for the editorial note.';
    }

    if (!formData.submitterEmail.trim()) {
      newErrors.submitterEmail = 'Enter a contact email.';
    } else if (!validateSubmissionEmail(formData.submitterEmail.trim())) {
      newErrors.submitterEmail = 'Enter a valid contact email.';
    }

    if (isBusinessSubmission(formData.submissionType) && !formData.budgetRange) {
      newErrors.budgetRange = 'Choose a budget range so we can route the inquiry correctly.';
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await submitToolSubmissionApi({
        ...formData,
        website2,
        name: formData.name.trim(),
        website: formData.website.trim(),
        description: formData.description.trim(),
        reason: formData.reason.trim(),
        submitterName: formData.submitterName.trim(),
        submitterEmail: formData.submitterEmail.trim(),
        companyName: formData.companyName.trim(),
      });

      if (!result.success) {
        setSubmitError(normalizeSubmitError(result.message));
        return;
      }

      setSuccessMessage(getSuccessMessage(formData.submissionType));
      setSubmitted(true);
    } catch {
      setSubmitError('Submission failed. Please try again in a moment.');
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-2xl border border-border-light bg-surface-card p-8 text-center shadow-lg sm:p-12">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-text-primary">Submission received</h1>
          <p className="mb-2 text-lg text-text-secondary">
            We received <strong className="text-accent-warm">{formData.name}</strong>
            {isBusiness ? '\'s partnership request.' : '\'s listing request.'}
          </p>
          <p className="mb-2 text-text-muted">{successMessage}</p>
          <p className="mb-8 text-text-muted">
            {isBusiness
              ? 'Our team will reply using the email you shared.'
              : 'The editorial team will email you once the review is complete.'}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <NextLink
              href="/tools"
              className="inline-flex items-center justify-center rounded-xl bg-accent-warm px-6 py-3 font-medium text-white transition-all hover:bg-accent-warm-hover"
            >
              Browse the directory
            </NextLink>
            <NextLink
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-border-medium bg-surface-base px-6 py-3 font-medium text-text-primary transition-all hover:bg-surface-hover"
            >
              Return home
            </NextLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center sm:mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-warm/10 px-3 py-1.5 text-accent-warm">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">Submit a product or open a commercial inquiry</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-text-primary sm:text-4xl">Help more people discover your AI product</h1>
        <p className="mx-auto max-w-xl text-text-secondary">
          We support free listings, priority review, and sponsored placements. Start with the route that matches your launch urgency and growth goal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border-light bg-surface-card p-6 shadow-lg sm:p-8">
        <input
          type="text"
          name="website2"
          value={website2}
          onChange={(event) => setWebsite2(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
        />

        <div className="mb-8">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Sparkles className="h-4 w-4 text-accent-warm" />
            Submission route <span className="text-red-500">*</span>
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {submissionPlans.map((plan) => {
              const Icon = plan.icon;
              const active = formData.submissionType === plan.value;
              return (
                <button
                  key={plan.value}
                  type="button"
                  onClick={() => handleInputChange('submissionType', plan.value)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    active
                      ? 'border-accent-warm bg-accent-warm/10 shadow-sm'
                      : 'border-border-medium hover:border-accent-warm/50 hover:bg-surface-hover'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? 'bg-accent-warm text-white' : 'bg-surface-base text-accent-warm'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{plan.title}</p>
                      <p className="text-xs text-accent-warm">{plan.helper}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-text-secondary">{plan.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Sparkles className="h-4 w-4 text-accent-warm" />
            Product name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(event) => handleInputChange('name', event.target.value)}
            className={`w-full rounded-xl border bg-surface-base px-4 py-3 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20 ${
              errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="For example: ChatGPT, Midjourney, Cursor"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="website" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <LinkIcon className="h-4 w-4 text-accent-warm" />
            Official URL <span className="text-red-500">*</span>
          </label>
          <input
            id="website"
            type="url"
            value={formData.website}
            onChange={(event) => handleInputChange('website', event.target.value)}
            className={`w-full rounded-xl border bg-surface-base px-4 py-3 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20 ${
              errors.website ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="https://example.com"
          />
          {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
        </div>

        <div className="mb-6">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Layers className="h-4 w-4 text-accent-warm" />
            Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleInputChange('category', category.value)}
                className={`flex flex-col items-center justify-center rounded-xl border p-3 transition-all ${
                  formData.category === category.value
                    ? 'border-accent-warm bg-accent-warm/10 text-accent-warm'
                    : 'border-border-medium hover:border-accent-warm/50 hover:bg-surface-hover'
                }`}
              >
                <span className="mb-1 text-2xl">{category.icon}</span>
                <span className="text-center text-xs font-medium">{category.label}</span>
              </button>
            ))}
          </div>
          {errors.category && <p className="mt-2 text-sm text-red-500">{errors.category}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <FileText className="h-4 w-4 text-accent-warm" />
            Product summary <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(event) => handleInputChange('description', event.target.value)}
            className={`w-full resize-none rounded-xl border bg-surface-base px-4 py-3 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20 ${
              errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="Summarize the product, who it helps, and what job it does well."
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          <p className="mt-1 text-right text-xs text-text-muted">{formData.description.length} / 500</p>
        </div>

        <div className="mb-6">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Tag className="h-4 w-4 text-accent-warm" />
            Tags <span className="font-normal text-text-muted">(optional, up to 5)</span>
          </label>

          {formData.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-accent-warm/10 px-3 py-1 text-sm text-accent-warm"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-accent-warm-hover">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="mb-3 flex flex-wrap gap-2">
            {popularTags
              .filter((tag) => !formData.tags.includes(tag))
              .slice(0, 8)
              .map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTag(tag)}
                  disabled={formData.tags.length >= 5}
                  className="rounded-full border border-border-medium bg-surface-base px-3 py-1 text-xs text-text-secondary transition-all hover:border-accent-warm hover:text-accent-warm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  + {tag}
                </button>
              ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && (event.preventDefault(), handleAddTag())}
              disabled={formData.tags.length >= 5}
              className="flex-1 rounded-xl border border-border-medium bg-surface-base px-4 py-2 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20 disabled:opacity-50"
              placeholder="Add a custom tag and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={formData.tags.length >= 5 || !tagInput.trim()}
              className="rounded-xl border border-border-medium bg-surface-base px-4 py-2 text-text-primary transition-all hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="reason" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Send className="h-4 w-4 text-accent-warm" />
            Why should we feature it? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            rows={4}
            value={formData.reason}
            onChange={(event) => handleInputChange('reason', event.target.value)}
            className={`w-full resize-none rounded-xl border bg-surface-base px-4 py-3 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20 ${
              errors.reason ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
            }`}
            placeholder="Explain the problem it solves, what makes it credible, and why it deserves attention right now."
          />
          {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
          <p className="mt-1 text-right text-xs text-text-muted">{formData.reason.length} / 1000</p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="submitterName" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <User className="h-4 w-4 text-accent-warm" />
              Contact name <span className="font-normal text-text-muted">(optional)</span>
            </label>
            <input
              id="submitterName"
              type="text"
              value={formData.submitterName}
              onChange={(event) => handleInputChange('submitterName', event.target.value)}
              className="w-full rounded-xl border border-border-medium bg-surface-base px-4 py-3 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20"
              placeholder="Your name or team name"
            />
          </div>
          <div>
            <label htmlFor="submitterEmail" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Mail className="h-4 w-4 text-accent-warm" />
              Contact email <span className="text-red-500">*</span>
            </label>
            <input
              id="submitterEmail"
              type="email"
              value={formData.submitterEmail}
              onChange={(event) => handleInputChange('submitterEmail', event.target.value)}
              className={`w-full rounded-xl border bg-surface-base px-4 py-3 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20 ${
                errors.submitterEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border-medium'
              }`}
              placeholder="name@company.com"
            />
            {errors.submitterEmail && <p className="mt-1 text-sm text-red-500">{errors.submitterEmail}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="companyName" className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Building2 className="h-4 w-4 text-accent-warm" />
            Company / team <span className="font-normal text-text-muted">(optional)</span>
          </label>
          <input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={(event) => handleInputChange('companyName', event.target.value)}
            className="w-full rounded-xl border border-border-medium bg-surface-base px-4 py-3 text-text-primary transition-all focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/20"
            placeholder="For example: OpenAI, Acme Studio, Product Growth Team"
          />
        </div>

        {isBusinessSubmission(formData.submissionType) && (
          <div className="mb-8">
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Megaphone className="h-4 w-4 text-accent-warm" />
              Budget range <span className="text-red-500">*</span>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleInputChange('budgetRange', option)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    formData.budgetRange === option
                      ? 'border-accent-warm bg-accent-warm/10 text-accent-warm'
                      : 'border-border-medium text-text-secondary hover:border-accent-warm/50 hover:bg-surface-hover'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.budgetRange && <p className="mt-2 text-sm text-red-500">{errors.budgetRange}</p>}
            <p className="mt-2 text-xs text-text-muted">
              This is only used for internal routing and is never displayed publicly.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-warm py-4 text-lg font-semibold text-white shadow-lg shadow-accent-warm/25 transition-all hover:bg-accent-warm-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              {isBusinessSubmission(formData.submissionType) ? 'Send commercial inquiry' : 'Submit listing request'}
            </>
          )}
        </button>

        {submitError && <p className="mt-3 text-center text-sm text-red-600">{submitError}</p>}

        <p className="mt-4 text-center text-xs leading-relaxed text-text-muted">
          By submitting this form, you agree to our{' '}
          <NextLink href="/privacy" className="text-accent-cyan hover:opacity-85">
            Privacy Policy
          </NextLink>{' '}
          and{' '}
          <NextLink href="/terms" className="text-accent-cyan hover:opacity-85">
            Terms of Service
          </NextLink>
          , and acknowledge our{' '}
          <NextLink href="/disclosure" className="text-accent-cyan hover:opacity-85">
            Disclosure Policy
          </NextLink>
          .
        </p>
      </form>
    </div>
  );
}
