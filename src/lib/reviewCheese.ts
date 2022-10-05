import {
  CreateCheeseReviewMutation,
  CreateCheeseReviewMutationVariables,
  PublishCheeseReviewMutation
} from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const createReviewMutationDocument = gql`
  mutation CreateCheeseReview($rating: Int!, $reviewer: String = "", $content: String = "", $cheeseId: ID!) {
    createReview(
      data: { rating: $rating, reviewer: $reviewer, content: $content, cheese: { connect: { id: $cheeseId } } }
    ) {
      id
    }
  }
`;

const publishReviewMutationDocument = gql`
  mutation PublishCheeseReview($id: ID = "") {
    publishReview(where: { id: $id }) {
      id
    }
  }
`;

export const reviewCheese = async (input: CreateCheeseReviewMutationVariables) => {
  const createResponse = await hygraphClient.request<CreateCheeseReviewMutation>(createReviewMutationDocument, input);
  await hygraphClient.request<PublishCheeseReviewMutation>(publishReviewMutationDocument, {
    id: createResponse.createReview?.id
  });
};
