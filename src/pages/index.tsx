import { HomeView } from '@/components/HomeView';
import { getAllCheeses } from '@/lib/getAllCheeses';
import { getRatingByCheeseIds } from '@/lib/getRatingByCheeseIds';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import { InferNextProps } from '@/utils/InferStaticProps';
import groupBy from 'lodash/groupBy';
import type { NextPage } from 'next';

const Home: NextPage<InferNextProps<typeof getStaticProps>> = (props) => {
  return <HomeView {...props} />;
};

export const getStaticProps = async () => {
  const cheesesQuery = await getAllCheeses();

  const reviews = await getRatingByCheeseIds({ cheeseIds: cheesesQuery.cheeses.map((cheese) => cheese.id) });
  const reviewsByCheese = groupBy(reviews.reviews, 'cheese.id');

  const cheeses = cheesesQuery.cheeses
    .map((cheese) => ({
      ...cheese,
      rating: getRatingFromReviews(reviewsByCheese[cheese.id] ?? [])
    }))
    .sort((a, b) => b.rating - a.rating);

  return {
    props: {
      cheeses
    },
    revalidate: 15
  };
};

export default Home;
