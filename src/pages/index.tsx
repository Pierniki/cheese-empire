import type { InferGetStaticPropsType, NextPage } from 'next';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { AllCheesesQuery } from '../gql/graphql';
import hygraphClient, { gql } from '../lib/hygraphClient';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <>
      <div className="relative z-10 w-full shadow-lg">
        <div className="container relative z-10 mx-auto flex items-center justify-center px-16">
          <div className="w-full border-b-4 border-[#1a1813]" />
          <div className="relative flex flex-col items-center p-8">
            <h2 className="min-w-[350px] text-center font-pacifico text-5xl font-bold text-[#1a1813]">Cheese Empire</h2>
            <span className="z-10 mt-2 font-pacifico text-lg text-[#ffa300]">{"Feelin' cheesy?"}</span>
            <div className="absolute -bottom-4 z-0 h-8 w-8 rotate-45 bg-[#fff3d4] lg:h-16 lg:w-16"></div>
          </div>
          <div className="w-full border-b-4 border-[#1a1813]" />
        </div>
      </div>
      <section className="relative grid min-h-[800px] w-full overflow-hidden" id="hero">
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
            <a href="#offer">
              <button className=" mx-auto border-2 border-yellow-50 bg-black bg-opacity-20 px-4 py-2  font-roboto text-lg font-bold uppercase text-yellow-50 duration-100 hover:scale-105 hover:shadow-lg">
                Show me the Cheese
              </button>
            </a>
            <a href="#offer">
              <BsArrowDownCircleFill className="mt-8 cursor-pointer text-4xl shadow-sm duration-100 hover:scale-110 hover:shadow-lg" />
            </a>
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
      <section className="bg-[#fff3d4]" id="offer">
        <div className="container mx-auto px-16 py-16">
          <h5 className="mb-16 w-full  text-center font-serif text-5xl font-bold text-[#1a1813]">Our offer</h5>
          <div className="grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {props.cheeses.map((cheese) => {
              const primaryCategory = cheese.categories[0];
              return (
                <Link key={cheese.id} passHref href={'/cheeses/' + cheese.slug}>
                  <div className="relative mx-auto flex cursor-pointer flex-col font-roboto shadow-sm duration-100 hover:scale-105 hover:shadow-lg">
                    <div className="relative flex max-h-[250px] max-w-[300px] bg-white">
                      <Image
                        src={cheese.image.url}
                        width="300"
                        height="250"
                        alt={cheese.name}
                        className="object-cover opacity-90 brightness-110"
                      />
                      <div className="absolute h-full w-full bg-gradient-to-t from-[#1a1813] via-transparent to-transparent"></div>
                      <div className="absolute top-0 p-4">
                        {primaryCategory && (
                          <div className="inline-block rounded-sm bg-[#ffa300] px-2 shadow-sm">
                            {primaryCategory.name}
                          </div>
                        )}
                      </div>
                      <p className="absolute -bottom-8 max-w-[75%] p-4 text-xl text-white">{cheese.name}</p>
                    </div>
                    <div className="h-8  bg-[#1a1813] pb-0"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export const allCheesesQueryDocument = gql`
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

export const getStaticProps = async () => {
  const res = await hygraphClient.request<AllCheesesQuery>(allCheesesQueryDocument);
  return {
    props: res
  };
};

export default Home;
