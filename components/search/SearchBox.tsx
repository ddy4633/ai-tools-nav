'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search AI tools..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-accent-warm text-white text-sm font-medium rounded-lg hover:bg-accent-warm-hover transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
