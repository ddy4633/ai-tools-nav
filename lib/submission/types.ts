export type SubmissionPlan = 'free' | 'priority' | 'sponsored';

export interface ToolSubmissionInput {
  name: string;
  website: string;
  description: string;
  category: string;
  tags?: string[];
  reason: string;
  submitterName?: string;
  submitterEmail: string;
  companyName?: string;
  submissionType: SubmissionPlan;
  budgetRange?: string;
}
