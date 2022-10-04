import { CheesesByCategoriesQuery, CheesesByCategoriesQueryVariables } from '@/gql/graphql';
import hygraphClient, { gql } from './hygraphClient';

const cheesesByCategoriesQueryDocument = gql`
  query CheesesByCategories($name_in: [String] = "") {
    categories(where: { name_in: $name_in }) {
      name
      id
      cheeses {
        ... on Cheese {
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
    }
  }
`;

export const getCheesesByCategories = (variables: CheesesByCategoriesQueryVariables) =>
  hygraphClient.request<CheesesByCategoriesQuery>(cheesesByCategoriesQueryDocument, variables);
