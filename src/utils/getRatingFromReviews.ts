import { sumBy } from 'lodash';

export const getRatingFromReviews = (reviews: { rating: number }[]) =>
  reviews.length > 0 ? sumBy(reviews, 'rating') / reviews.length : 0;
