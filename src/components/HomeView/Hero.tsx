import React from 'react';
import { BsArrowDownCircleFill } from 'react-icons/bs';

type Props = {
  //
};

export const Hero: React.FC<Props> = () => {
  return (
    <section className="relative grid min-h-[800px] w-full overflow-hidden" id="hero">
      <div className="absolute -top-4 z-10 flex w-full justify-center lg:-top-12 ">
        <div className="h-8 w-8 rotate-45 bg-yellow-50 lg:h-16 lg:w-16"></div>
      </div>
      <div className="container mx-auto grid grid-cols-1 p-8  lg:grid-cols-5 lg:p-16">
        <div className="z-10 mx-auto flex max-w-[600px] flex-col items-center justify-center border-4 border-yellow-50 p-8 font-serif text-yellow-50 lg:col-span-2 lg:p-12">
          <p className="text-center text-4xl font-bold text-yellow-50">
            Make your <span className=" text-amber-500">dreams</span> come true thanks to our{' '}
            <span className=" text-amber-500">rich</span> selection of various{' '}
            <span className="text-amber-500">cheeses</span>
          </p>
          <div className="mt-16 mb-8 w-full border-b-2 border-yellow-50" />
          <p className="text-center text-xl font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus eleifend sem, at congue dui.
          </p>
          <div className="mt-8 mb-16 w-full border-b-2 border-yellow-50" />
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
        <div className="h-8 w-8 rotate-45 bg-yellow-50 lg:h-16 lg:w-16"></div>
      </div>
    </section>
  );
};
