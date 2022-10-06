import React from 'react';
import { CheeseDetails, CheeseDetailsBox } from './CheeseDetailsBox';
import { CheeseGrid, CheeseSimple } from '../CheeseGrid';
import { Rating } from '../Rating';
import { Review, ReviewsList } from './ReviewsList';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import { RateCheeseForm } from './RateCheeseForm';

interface Props {
  cheese: CheeseDetails;
  similarCheeses: CheeseSimple[];
  reviews: Review[];
}

export const CheesePageView: React.FC<Props> = ({ cheese, similarCheeses, reviews }) => {
  const averateRating = getRatingFromReviews(reviews);

  return (
    <div className="container mx-auto p-4 sm:p-16">
      <div className="mt-8">
        <div className="flex flex-col gap-4">
          <CheeseDetailsBox cheese={cheese} />

          <p className="font-serif text-4xl font-bold text-stone-900">Reviews</p>
          <div className="flex flex-nowrap items-center gap-1">
            <Rating rating={averateRating} size="16px" />
            {reviews.length > 0 && <span className="ml-2 font-semibold">{`${(averateRating / 2).toFixed(1)}/5`}</span>}
          </div>

          <ReviewsList reviews={reviews} />
          <RateCheeseForm cheeseId={cheese.id} />
        </div>
      </div>
      {similarCheeses.length > 0 && (
        <div className="mt-16">
          <h5 className="mb-8 w-full text-center font-serif text-4xl font-bold text-stone-900 sm:text-left">
            Similar cheeses:
          </h5>
          <CheeseGrid cheeses={similarCheeses} />
        </div>
      )}
    </div>
  );
};
