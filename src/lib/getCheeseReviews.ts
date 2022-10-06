import { CheeseReviewsQuery } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const cheeseReviewsQueryDocument = gql`
  query CheeseReviews($cheeseId: ID = "", $first: Int = 10, $skip: Int = 10) {
    reviews(where: { cheese: { id: $cheeseId } }, orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      createdAt
      content
      rating
      reviewer
    }
    reviewsConnection(where: { cheese: { id: $cheeseId } }) {
      aggregate {
        count
      }
    }
  }
`;

export const getCheeseReviews = ({ cheeseId, page, perPage }: { cheeseId: string; page: number; perPage: number }) =>
  hygraphClient.request<CheeseReviewsQuery>(cheeseReviewsQueryDocument, {
    cheeseId: cheeseId,
    first: perPage,
    skip: page * perPage
  });
