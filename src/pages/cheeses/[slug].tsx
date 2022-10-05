import { CheeseGrid } from '@/components/CheeseGrid';
import { getAllCheeses } from '@/lib/getAllCheeses';
import { getCheese } from '@/lib/getCheese';
import { getCheesesByCategories } from '@/lib/getCheesesByCategories';
import { getRatingByCheeseIds } from '@/lib/getRatingByCheeseIds';
import { reviewCheese } from '@/lib/reviewCheese';
import { formatCurrency } from '@/utils/formatCurrency';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import { InferNextProps } from '@/utils/InferStaticProps';
import { getCookie } from 'cookies-next';
import _ from 'lodash';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

const CheesePage: NextPage<InferNextProps<typeof getStaticProps>> = ({ cheese, similarCheeses }) => {
  const router = useRouter();

  const rateCheeseMutation = useMutation((input: { rating: number; reviewer?: string; content?: string }) =>
    reviewCheese({ ...input, cheeseId: cheese.id, reviewerId: getCookie('user-token')?.toString() ?? '' })
  );

  if (router.isFallback) return null;

  return (
    <div className="container mx-auto py-16 px-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="contrast-110 relative h-full min-h-[400px] shadow-sm saturate-[0.9]">
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
          <button onClick={() => rateCheeseMutation.mutate({ rating: 10 })}>Rate 5 stars</button>
        </div>
      </div>
      {similarCheeses.length > 0 && (
        <div className="mt-16">
          <h5 className="mb-8 w-full text-center font-serif text-4xl font-bold text-stone-900 sm:text-left">
            Similar cheeses:
          </h5>
          <CheeseGrid cheeses={similarCheeses} />
        </div>
      )}
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await getAllCheeses();

  const paths = res.cheeses.map((cheese) => ({ params: { slug: cheese.slug } }));
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  if (typeof params?.slug !== 'string') throw Error();

  const cheeseQuery = await getCheese({ slug: params.slug });

  if (!cheeseQuery.cheese)
    return {
      notFound: true
    };

  const similarCheesesQuery = await getCheesesByCategories({
    name_in: cheeseQuery.cheese.categories.map((category) => category.name)
  });
  const similarCheeses = similarCheesesQuery.categories.flatMap((cat) => cat.cheeses);

  const reviews = await getRatingByCheeseIds({
    cheeseIds: similarCheeses.map((cheese) => cheese.id)
  });
  const reviewsByCheese = _.groupBy(reviews.reviews, 'cheese.id');

  const ratedSimilarCheeses = similarCheeses.map((cheese) => ({
    ...cheese,
    rating: getRatingFromReviews(reviewsByCheese[cheese.id] ?? [])
  }));

  return {
    props: {
      cheese: cheeseQuery.cheese,
      similarCheeses: ratedSimilarCheeses
    },
    revalidate: 15
  };
};

export default CheesePage;
