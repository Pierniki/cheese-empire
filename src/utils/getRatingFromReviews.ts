import _ from 'lodash';

export const getRatingFromReviews = (reviews: { rating: number }[]) =>
  reviews.length > 0 ? _.sumBy(reviews, 'rating') / reviews.length : 0;
