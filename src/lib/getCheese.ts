import { CheeseQuery, CheeseQueryVariables } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const cheeseQueryDocument = gql`
  query Cheese($slug: String = "") {
    cheese(where: { slug: $slug }) {
      description
      id
      name
      price
      categories {
        name
        id
      }
      image {
        url
      }
    }
  }
`;

export const getCheese = (variables: CheeseQueryVariables) =>
  hygraphClient.request<CheeseQuery>(cheeseQueryDocument, variables);
