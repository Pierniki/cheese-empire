import { GetStaticProps, NextPage } from 'next';
import { allCheesesQueryDocument } from '..';
import { AllCheesesQuery, Cheese, CheeseQuery } from '../../gql/graphql';
import hygraphClient, { gql } from '../../lib/hygraphClient';

const CheesePage: NextPage<CheeseQuery> = (props) => {
  return <div>{props.cheese?.description}</div>;
};

export const cheeseQueryDocument = gql`
  query Cheese($slug: String = "") {
    cheese(where: { slug: $slug }) {
      description
      id
      name
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

export const getStaticPaths = async () => {
  const res = await hygraphClient.request<AllCheesesQuery>(allCheesesQueryDocument);

  const paths = res.cheeses.map((cheese) => ({ params: { slug: cheese.slug } }));
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.slug !== 'string') throw Error();

  const res = await hygraphClient.request<CheeseQuery>(cheeseQueryDocument, { slug: params.slug });
  console.log(res);
  if (!res.cheese)
    return {
      notFound: true
    };

  return {
    props: res,
    revalidate: 15
  };
};

export default CheesePage;
