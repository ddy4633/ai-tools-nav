'use client';

import { useState } from 'react';
import { StarRating } from '@/components/ui/star-rating';
import { submitRating } from '@/lib/supabase';

interface RatingFormProps {
  toolId: string;
}

export function RatingForm({ toolId }: RatingFormProps) {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (rating === 0) {
      setMessage('Please choose a rating first.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const result = await submitRating(toolId, rating);
      if (result.success) {
        setMessage('✅ Rating saved locally in this static build.');
        setRating(0);
      } else {
        setMessage(`❌ ${result.message || 'Rating submission failed. Please try again.'}`);
      }
    } catch {
      setMessage('❌ Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-text-secondary">Your rating:</span>
        <StarRating
          rating={rating}
          interactive
          size="lg"
          onRatingChange={setRating}
        />
        {rating > 0 && (
          <span className="text-sm text-text-muted">{rating} / 5</span>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || rating === 0}
        className="px-6 py-2 bg-accent-warm text-white font-medium rounded-lg hover:bg-accent-warm-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit rating'}
      </button>

      {message && (
        <p className={`text-sm ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
