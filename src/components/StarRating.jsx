import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRate, interactive = false }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && onRate(star)}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    className={`${interactive ? 'cursor-pointer' : 'cursor-default'} focus:outline-none transition-colors duration-200`}
                    disabled={!interactive}
                >
                    <Star
                        size={interactive ? 24 : 16}
                        fill={(interactive ? hoverRating || rating : rating) >= star ? "currentColor" : "none"}
                        className={`${(interactive ? hoverRating || rating : rating) >= star
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default StarRating;
