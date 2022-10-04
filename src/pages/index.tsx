import { CheeseGrid } from '@/components/CheeseGrid';
import { Hero } from '@/components/Hero';
import { getAllCheeses } from '@/lib/getAllCheeses';
import { InferNextProps } from '@/utils/InferStaticProps';
import type { NextPage } from 'next';

const Home: NextPage<InferNextProps<typeof getStaticProps>> = (props) => {
  return (
    <>
      <Hero />
      <section className="bg-yellow-50" id="offer">
        <div className="container mx-auto px-16 py-16">
          <h5 className="mb-16 w-full  text-center font-serif text-5xl font-bold text-stone-900">Our offer</h5>
          <CheeseGrid cheeses={props.cheeses} />
        </div>
      </section>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await getAllCheeses();
  return {
    props: res
  };
};

export default Home;
