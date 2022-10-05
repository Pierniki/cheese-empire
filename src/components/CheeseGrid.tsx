import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency';
import _ from 'lodash';

type Props = {
  cheeses: CheeseCardItem[];
};

export const CheeseGrid: React.FC<Props> = ({ cheeses }) => {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {cheeses.map((cheese) => {
        return <CheeseCard key={cheese.id} cheese={cheese} />;
      })}
    </div>
  );
};

type CheeseCardProps = {
  cheese: CheeseCardItem;
};

export type CheeseCardItem = {
  slug: string;
  id: string;
  name: string;
  price: number;
  rating: number;
  categories: { name: string; id: string }[];
  image: {
    url: string;
  };
};

export const CheeseCard: React.FC<CheeseCardProps> = ({ cheese }) => {
  const primaryCategory = cheese.categories[0];
  const secondaryCategory = cheese.categories[1];

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
          <div className="absolute h-full w-full bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
          <div className="absolute top-0 flex w-full items-center justify-between gap-2 p-4">
            <div className="flex max-w-[60%] gap-2">
              {primaryCategory && (
                <div className="inline-block whitespace-nowrap rounded-sm bg-amber-500 px-2 shadow-sm">
                  {primaryCategory.name}
                </div>
              )}
              {secondaryCategory && (
                <div className="inline-block whitespace-nowrap rounded-sm bg-amber-300 px-2 shadow-sm">
                  {secondaryCategory.name}
                </div>
              )}
            </div>
            <div>
              <Rating rating={cheese.rating} cheeseId={cheese.id} />
            </div>
          </div>
          <div className="absolute -bottom-8 flex w-full items-end justify-between p-4 text-white">
            <p className=" max-w-[60%] text-xl ">{cheese.name}</p>
            <span className="whitespace-nowrap rounded-lg bg-yellow-50 bg-opacity-10 px-2 text-xl font-bold text-white">
              {formatCurrency(cheese.price)}
            </span>
          </div>
        </div>
        <div className="h-8 bg-stone-900 pb-0"></div>
      </div>
    </Link>
  );
};

const Rating: React.FC<{ rating: number; cheeseId: string }> = ({ rating, cheeseId }) => {
  const stars = [1, 2, 3, 4, 5];
  const doubledRating = Math.floor(rating * 2);

  return (
    <div className="flex gap-1">
      {stars.map((star, idx) => {
        return (
          <div
            key={'rating-star-' + star + '-' + cheeseId}
            className={`relative h-2 w-2 rounded-full ${
              idx + 1 > rating ? 'bg-slate-400 bg-opacity-40' : ' bg-amber-400'
            }`}
          >
            {doubledRating === idx * 2 + 1 && (
              <div
                className="absolute top-0 left-0 z-20 h-2 w-2 rounded-full"
                style={{ background: 'linear-gradient(90deg, rgba(251,191,36) 50%, rgba(23,115,196,0) 50%);' }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
