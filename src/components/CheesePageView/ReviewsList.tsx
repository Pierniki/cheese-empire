import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Rating } from '../Rating';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
  reviews: Review[];
  allReviewsCount: number;
}

export type Review = {
  reviewer?: string | null | undefined;
  createdAt: string;
  rating: number;
  content?: string | null | undefined;
  id: string;
};

export const ReviewsList: React.FC<Props> = ({ reviews, allReviewsCount }) => {
  const [listRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="flex flex-col gap-4 font-roboto text-stone-900" ref={listRef}>
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
            {review.content && <ReviewContent content={review.content} />}
          </div>
        );
      })}
      {allReviewsCount === 0 && <p className="text-stone-500">No reviews yet. Be the first one to review!</p>}
    </div>
  );
};

const ReviewContent = (props: { content: string }) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const cutReviewContent = props.content.slice(0, 200);

  if (showAll || props.content.length === cutReviewContent.length) return <p>{props.content}</p>;
  return (
    <p>
      {cutReviewContent}
      <span className="mr-2">...</span>
      <button className="font-semibold" onClick={() => setShowAll(true)}>
        Read more
      </button>
    </p>
  );
};
