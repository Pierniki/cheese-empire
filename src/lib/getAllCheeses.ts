import { AllCheesesQuery } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const allCheesesQueryDocument = gql`
  query AllCheeses {
    cheeses(first: 1000) {
      id
      name
      slug
      price
      image {
        url
      }
      categories {
        id
        name
      }
      reviews {
        rating
      }
    }
  }
`;

export const getAllCheeses = () => hygraphClient.request<AllCheesesQuery>(allCheesesQueryDocument);
