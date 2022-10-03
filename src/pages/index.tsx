import type { InferGetStaticPropsType, NextPage } from 'next';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { AllCheesesQuery } from '../gql/graphql';
import hygraphClient, { gql } from '../lib/hygraphClient';
import Image from 'next/image';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <div className="min-h-screen bg-[#fff3d4] saturate-[0.8]">
      <div className="relative z-10 flex w-full items-center justify-center px-16 shadow-lg">
        <div className="w-full border-b-4 border-[#1a1813]" />
        <div className="relative flex flex-col items-center p-8">
          <h2 className="min-w-[350px] text-center font-pacifico text-5xl font-bold text-[#1a1813]">Cheese Empire</h2>
          <h5 className="z-10 mt-2 font-pacifico text-lg text-[#ffa300]">{"Feelin' cheesy?"}</h5>
          <div className="absolute -bottom-4 z-0 h-8 w-8 rotate-45 bg-[#fff3d4] lg:h-16 lg:w-16"></div>
        </div>
        <div className="w-full border-b-4 border-[#1a1813]" />
      </div>
      <section className="relative grid min-h-[800px] w-full  overflow-hidden" id="hero">
        <div className="container mx-auto grid grid-cols-1 p-8  lg:grid-cols-5 lg:p-16">
          <div className="z-10 mx-auto flex max-w-[600px] flex-col items-center justify-center border-4 border-[#fff3d4] p-8 font-serif text-yellow-50 lg:col-span-2 lg:p-12">
            <p className="text-center text-4xl font-bold text-yellow-50">
              Make your <span className=" text-[#ffa300]">dreams</span> come true thanks to our{' '}
              <span className=" text-[#ffa300]">rich</span> selection of various{' '}
              <span className="text-[#ffa300]">cheeses</span>
            </p>
            <div className="mt-16 mb-8 w-full border-b-2 border-[#fff3d4]" />
            <p className="text-center text-xl font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eleifend sem, at congue dui.
            </p>
            <div className="mt-8 mb-16 w-full border-b-2 border-[#fff3d4]" />
            <button className=" mx-auto border-2 border-yellow-50 bg-black bg-opacity-20 px-4 py-2  text-lg font-bold uppercase text-yellow-50">
              Show me the Cheese
            </button>
            <BsArrowDownCircleFill className="mt-8 cursor-pointer text-4xl" />
          </div>
        </div>
        <div
          style={{ backgroundImage: 'url(./cheese-hero.webp)' }}
          className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-neutral-700 bg-cover brightness-[0.45] saturate-50"
        />
        <div className="absolute -bottom-4 z-0 flex w-full justify-center lg:-bottom-12">
          <div className="h-8 w-8 rotate-45 bg-[#fff3d4] lg:h-16 lg:w-16"></div>
        </div>
      </section>
      <section className="container mx-auto px-16 py-16">
        <h5 className="mb-16 w-full  text-center font-serif text-4xl font-bold text-[#1a1813]">Our offer</h5>
        <div className="grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {props.cheeses.map((cheese) => {
            return (
              <div key={cheese.id} className="mx-auto">
                <Image src={cheese.image.url} width="300" height="300" alt={cheese.name} />
                <p>{cheese.name}</p>
              </div>
            );
          })}
        </div>
      </section>
      <footer className="min-h-[300px] border-t-4 border-[#1a1813]"></footer>
    </div>
  );
};

const allCheesesQueryDocument = gql`
  query AllCheeses {
    cheeses {
      id
      name
      image {
        url
      }
    }
  }
`;

export const getStaticProps = async () => {
  const res = await hygraphClient.request<AllCheesesQuery>(allCheesesQueryDocument);
  return {
    props: res
  };
};

export default Home;
