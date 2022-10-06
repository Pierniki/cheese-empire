import { getCheeseReviews } from '@/lib/getCheeseReviews';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import React from 'react';
import { useQuery } from 'react-query';
import { CheeseGrid, CheeseSimple } from '../CheeseGrid';
import { Rating } from '../Rating';
import { useSnackbar } from '../Snackbar';
import { CheeseDetails, CheeseDetailsBox } from './CheeseDetailsBox';
import { RateCheeseForm } from './RateCheeseForm';
import { Review, ReviewsList } from './ReviewsList';

interface Props {
  cheese: CheeseDetails;
  similarCheeses: CheeseSimple[];
  initialReviews: Review[];
}

export const CheesePageView: React.FC<Props> = ({ cheese, similarCheeses, initialReviews }) => {
  const { push } = useSnackbar();
  const [reviewed, setReviewed] = React.useState<boolean>(false);

  const { data: reviews, refetch } = useQuery(
    ['reviews', cheese.id],
    () =>
      getCheeseReviews({ cheeseId: cheese.id }).then((res) =>
        res.reviews.map((review) => ({ ...review, createdAt: new Date(review.createdAt).toDateString() }))
      ),
    { initialData: initialReviews, keepPreviousData: true, refetchOnMount: true, refetchOnWindowFocus: false }
  );

  const onReviewCheeseSuccess = () => {
    refetch();
    push({ content: 'Thank you for submitting your review!', type: 'success' });
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
