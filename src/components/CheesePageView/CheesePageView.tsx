import { getCheeseReviews } from '@/lib/getCheeseReviews';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';
import { useQuery } from 'react-query';
import { CheeseGrid, CheeseSimple } from '../CheeseGrid';
import { Pagination } from '../Pagination';
import { Rating } from '../Rating';
import { useSnackbar } from '../Snackbar';
import { CheeseDetails, CheeseDetailsBox } from './CheeseDetailsBox';
import { RateCheeseForm } from './RateCheeseForm';
import { Review, ReviewsList } from './ReviewsList';

interface Props {
  cheese: CheeseDetails;
  similarCheeses: CheeseSimple[];
  initialReviews: { reviews: Review[]; allCount: number };
}

const reviewsPerPage = 5;

export const CheesePageView: React.FC<Props> = ({ cheese, similarCheeses, initialReviews }) => {
  const [containerRef] = useAutoAnimate<HTMLDivElement>();
  const { push } = useSnackbar();
  const [reviewed, setReviewed] = React.useState<boolean>(false);

  const [reviewsPage, setReviewsPage] = React.useState<number>(0);
  const {
    data: reviewsQuery,
    refetch,
    isLoading: reviewsQueryLoading
  } = useQuery(
    ['reviews', cheese.id, reviewsPage],
    () =>
      getCheeseReviews({ cheeseId: cheese.id, perPage: reviewsPerPage, page: reviewsPage }).then((res) => ({
        reviews: res.reviews.map((review) => ({ ...review, createdAt: new Date(review.createdAt).toDateString() })),
        allCount: res.reviewsConnection.aggregate.count
      })),
    { initialData: initialReviews, keepPreviousData: true, refetchOnMount: true, refetchOnWindowFocus: false }
  );

  const onReviewCheeseSuccess = () => {
    refetch();
    push({ content: 'Thank you for submitting your review!', type: 'success' });
    setReviewed(true);
  };

  const onReviewCheeseError = () => {
    push({ content: 'Something went wrong with submitting your review.', type: 'error' });
  };

  React.useEffect(() => {
    setReviewsPage(0);
    setReviewed(false);
  }, [cheese]);

  return (
    <div className="container mx-auto p-4 sm:p-16">
      <div className="mt-8">
        <div className="flex flex-col gap-4" ref={containerRef}>
          <CheeseDetailsBox cheese={cheese} />
          {reviewsQuery?.reviews !== undefined && (
            <>
              <p className="font-serif text-4xl font-bold text-stone-900">Reviews</p>
              <div className="flex flex-nowrap items-center gap-1">
                <Rating rating={cheese.averageRating} size="16px" />
                {reviewsQuery.allCount > 0 && (
                  <span className="ml-2 font-semibold">{`${(cheese.averageRating / 2).toFixed(1)}/5`}</span>
                )}
              </div>
              <ReviewsList reviews={reviewsQuery.reviews} allReviewsCount={reviewsQuery.allCount} />
              <Pagination
                perPage={reviewsPerPage}
                pageIdx={reviewsPage}
                allItemsCount={reviewsQuery.allCount}
                setPage={setReviewsPage}
                disabled={reviewsQueryLoading}
              />
            </>
          )}
          {!reviewed && (
            <RateCheeseForm cheeseId={cheese.id} onSuccess={onReviewCheeseSuccess} onError={onReviewCheeseError} />
          )}
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
