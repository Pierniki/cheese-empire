import { ReviewRatingsByCheeseIdsQuery, ReviewRatingsByCheeseIdsQueryVariables } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const reviewRatingsByCheeseIdsQueryDocument = gql`
  query ReviewRatingsByCheeseIds($cheeseIds: [ID] = "") {
    reviews(where: { cheese: { id_in: $cheeseIds } }, last: 100) {
      id
      rating
      cheese {
        id
      }
    }
  }
`;

export const getRatingByCheeseIds = (variables: ReviewRatingsByCheeseIdsQueryVariables) =>
  hygraphClient.request<ReviewRatingsByCheeseIdsQuery>(reviewRatingsByCheeseIdsQueryDocument, variables);
