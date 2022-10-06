import React from 'react';
import { CheeseGrid, CheeseSimple } from '../CheeseGrid';
import { Hero } from './Hero';

type Props = {
  cheeses: CheeseSimple[];
};

export const HomeView: React.FC<Props> = (props) => {
  return (
    <>
      <Hero />
      <section className="bg-yellow-50" id="offer">
        <div className="container mx-auto p-8 sm:p-16">
          <h5 className="mb-16 w-full  text-center font-serif text-5xl font-bold text-stone-900">Our best products:</h5>
          <CheeseGrid cheeses={props.cheeses} />
        </div>
      </section>
    </>
  );
};
