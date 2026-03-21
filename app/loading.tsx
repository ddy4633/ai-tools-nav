import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-accent-cyan/20 border-t-accent-cyan rounded-full animate-spin mx-auto mb-4"></div>
          <Loader2 className="w-6 h-6 text-accent-cyan absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
        </div>
        <p className="text-text-secondary">Loading...</p>
        <p className="text-sm text-text-muted mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}
