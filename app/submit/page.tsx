import { Metadata } from 'next';
import SubmitForm from './SubmitForm';

export const metadata: Metadata = {
  title: '提交工具 - 推荐好用的 AI 工具',
  description: '发现了好用的 AI 工具？提交给我们，让更多人知道它。我们欢迎各种优质的 AI 工具推荐。',
  keywords: ['提交工具', '推荐工具', 'AI工具推荐', '工具提交'],
};

export default function SubmitPage() {
  return <SubmitForm />;
}
