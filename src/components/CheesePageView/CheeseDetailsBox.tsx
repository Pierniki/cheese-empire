import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency';
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers';

interface Props {
  cheese: CheeseDetails;
}

export type CheeseDetails = {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: { name: string; id: string }[];
  image: {
    url: string;
  };
};

export const CheeseDetailsBox: React.FC<Props> = ({ cheese }) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="contrast-110 relative h-full min-h-[300px] shadow-sm saturate-[0.9] sm:min-h-[400px]">
        <Image layout="fill" src={cheese.image.url} className="object-cover" alt={cheese.name} />
        <div className="absolute h-full w-full bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
      </div>
      <div className="flex flex-col gap-2 font-roboto ">
        <h2 className="text-4xl font-semibold">{cheese.name}</h2>
        <h4 className="text-3xl font-bold">{formatCurrency(cheese.price)}</h4>
        <div className="flex gap-2">
          {cheese.categories.map((category) => {
            return (
              <div key={category.id} className="inline-block rounded-sm bg-[#ffa300] px-2 shadow-sm">
                {category.name}
              </div>
            );
          })}
        </div>
        <p className="font-roboto">{cheese.description}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-xl font-semibold">{'Quantity (100g)'}</p>
            <select className="my-2 w-full px-2 py-1">
              {getArrayOfNumbers(1, 5).map((value) => {
                return <option key={'quantity-' + value}>{value}</option>;
              })}
            </select>
            <button className="transition-bg w-full bg-stone-900 px-4 py-2 text-yellow-50 duration-100 hover:bg-stone-800 active:bg-stone-700">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
