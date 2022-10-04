import { AllCheesesQuery } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const allCheesesQueryDocument = gql`
  query AllCheeses {
    cheeses {
      id
      name
      slug
      image {
        url
      }
      categories {
        id
        name
      }
    }
  }
`;

export const getAllCheeses = () => hygraphClient.request<AllCheesesQuery>(allCheesesQueryDocument);
