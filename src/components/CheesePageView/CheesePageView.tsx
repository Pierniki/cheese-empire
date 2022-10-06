import React from 'react';
import { CheeseDetails, CheeseDetailsBox } from './CheeseDetailsBox';
import { CheeseGrid, CheeseSimple } from '../CheeseGrid';
import { Rating } from '../Rating';
import { Review, ReviewsList } from './ReviewsList';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import { RateCheeseForm } from './RateCheeseForm';
import { useQuery } from 'react-query';
import { getCheeseReviews } from '@/lib/getCheeseReviews';

interface Props {
  cheese: CheeseDetails;
  similarCheeses: CheeseSimple[];
  initialReviews: Review[];
}

export const CheesePageView: React.FC<Props> = ({ cheese, similarCheeses, initialReviews }) => {
  const [reviewed, setReviewed] = React.useState<boolean>(false);

  const { data: reviews, refetch } = useQuery(
    ['reviews', cheese.id],
    () =>
      getCheeseReviews({ cheeseId: cheese.id }).then((res) =>
        res.reviews.map((review) => ({ ...review, createdAt: new Date(review.createdAt).toDateString() }))
      ),
    { initialData: initialReviews, keepPreviousData: true, refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const onReviewCheeseSuccess = () => {
    refetch();
    setReviewed(true);
  };

  React.useEffect(() => {
    setReviewed(false);
  }, [cheese]);

  const averateRating = getRatingFromReviews(reviews ?? []);

  return (
    <div className="container mx-auto p-4 sm:p-16">
      <div className="mt-8">
        <div className="flex flex-col gap-4">
          <CheeseDetailsBox cheese={cheese} />
          {reviews !== undefined && (
            <>
              <p className="font-serif text-4xl font-bold text-stone-900">Reviews</p>
              <div className="flex flex-nowrap items-center gap-1">
                <Rating rating={averateRating} size="16px" />
                {reviews.length > 0 && (
                  <span className="ml-2 font-semibold">{`${(averateRating / 2).toFixed(1)}/5`}</span>
                )}
              </div>
              <ReviewsList reviews={reviews} />
            </>
          )}

          {!reviewed && <RateCheeseForm cheeseId={cheese.id} onSuccess={onReviewCheeseSuccess} />}
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
