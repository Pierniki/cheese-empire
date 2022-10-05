import { CheeseGrid } from '@/components/CheeseGrid';
import { Hero } from '@/components/Hero';
import { getAllCheeses } from '@/lib/getAllCheeses';
import { getRatingByCheeseIds } from '@/lib/getRatingByCheeseIds';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import { InferNextProps } from '@/utils/InferStaticProps';
import _ from 'lodash';
import type { NextPage } from 'next';

const Home: NextPage<InferNextProps<typeof getStaticProps>> = (props) => {
  return (
    <>
      <Hero />
      <section className="bg-yellow-50" id="offer">
        <div className="container mx-auto px-16 py-16">
          <h5 className="mb-16 w-full  text-center font-serif text-5xl font-bold text-stone-900">Our best products:</h5>
          <CheeseGrid cheeses={props.cheeses} />
        </div>
      </section>
    </>
  );
};

export const getStaticProps = async () => {
  const cheesesQuery = await getAllCheeses();

  const reviews = await getRatingByCheeseIds({ cheeseIds: cheesesQuery.cheeses.map((cheese) => cheese.id) });
  const reviewsByCheese = _.groupBy(reviews.reviews, 'cheese.id');

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
