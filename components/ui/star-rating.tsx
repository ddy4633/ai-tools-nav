'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

interface RatingDisplayProps {
  averageRating: number;
  ratingCount?: number;
  size?: 'sm' | 'md' | 'lg';
  emptyLabel?: string;
}

export function RatingDisplay({
  averageRating,
  ratingCount = 0,
  size = 'md',
  emptyLabel = 'Editor score',
}: RatingDisplayProps) {
  const showCount = ratingCount > 0;

  return (
    <div className="flex items-center gap-2">
      <StarRating rating={Math.round(averageRating)} size={size} />
      <span className="text-sm text-gray-600">
        {averageRating.toFixed(1)} {showCount ? `(${ratingCount} reviews)` : `(${emptyLabel})`}
      </span>
    </div>
  );
}
