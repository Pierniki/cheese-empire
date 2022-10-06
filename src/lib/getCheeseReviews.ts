import { CheeseReviewsQuery, CheeseReviewsQueryVariables } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const cheeseReviewsQueryDocument = gql`
  query CheeseReviews($cheeseId: ID = "") {
    reviews(where: { cheese: { id: $cheeseId } }, orderBy: createdAt_DESC) {
      id
      createdAt
      content
      rating
      reviewer
    }
  }
`;

export const getCheeseReviews = (variables: CheeseReviewsQueryVariables) =>
  hygraphClient.request<CheeseReviewsQuery>(cheeseReviewsQueryDocument, variables);
