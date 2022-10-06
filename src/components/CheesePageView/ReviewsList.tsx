import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Rating } from '../Rating';

interface Props {
  reviews: Review[];
}

export type Review = {
  reviewer?: string | null | undefined;
  createdAt: string;
  rating: number;
  content?: string | null | undefined;
  id: string;
};

export const ReviewsList: React.FC<Props> = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-4 font-roboto text-stone-900">
      {reviews.map((review) => {
        return (
          <div key={'review-' + review.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-lg">
              <FaUserCircle />
              <p className="font-semibold">
                {review.reviewer && review.reviewer !== '' ? review.reviewer : 'Anonymous'}
              </p>
              <span className="mt-1 text-xs">{review.createdAt}</span>
            </div>
            <Rating rating={review.rating} />
            {review.content && <p>{review.content}</p>}
          </div>
        );
      })}
      {reviews.length === 0 && <p className="text-stone-500">No reviews yet. Be the first one to review!</p>}
    </div>
  );
};
