import { ReviewsByCheeseIdsQuery, ReviewsByCheeseIdsQueryVariables } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const reviewsByCheeseIdsQueryDocument = gql`
  query ReviewsByCheeseIds($cheeseIds: [ID] = "") {
    reviews(where: { cheese: { id_in: $cheeseIds } }, last: 100) {
      id
      rating
      cheese {
        id
      }
    }
  }
`;

export const getReviewsByCheeseIds = (variables: ReviewsByCheeseIdsQueryVariables) =>
  hygraphClient.request<ReviewsByCheeseIdsQuery>(reviewsByCheeseIdsQueryDocument, variables);
