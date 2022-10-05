import { CheeseGrid } from '@/components/CheeseGrid';
import { Rating } from '@/components/Rating';
import { getAllCheeses } from '@/lib/getAllCheeses';
import { getCheese } from '@/lib/getCheese';
import { getCheeseReviews } from '@/lib/getCheeseReviews';
import { getCheesesByCategories } from '@/lib/getCheesesByCategories';
import { getRatingByCheeseIds } from '@/lib/getRatingByCheeseIds';
import { reviewCheese } from '@/lib/reviewCheese';
import { formatCurrency } from '@/utils/formatCurrency';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import { InferNextProps } from '@/utils/InferStaticProps';
import _ from 'lodash';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaUserCircle } from 'react-icons/fa';
import { useMutation } from 'react-query';

const CheesePage: NextPage<InferNextProps<typeof getStaticProps>> = ({ cheese, similarCheeses, reviews }) => {
  const router = useRouter();

  const rateCheeseMutation = useMutation((input: { rating: number; reviewer?: string; content?: string }) =>
    reviewCheese({ ...input, cheeseId: cheese.id })
  );

  if (router.isFallback) return null;

  return (
    <div className="container mx-auto p-8 sm:p-16">
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

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-xl font-semibold">{'Quantity (100g)'}</p>
              <select className="my-2 w-full px-2 py-1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <button className="transition-bg w-full bg-stone-900 px-4 py-2 text-yellow-50 duration-100 hover:bg-stone-800 active:bg-stone-700">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-4">
          <p className="font-serif text-4xl font-bold text-stone-900">Reviews</p>
          <div className="flex flex-nowrap items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              return <div key={cheese.id + star} className="h-6 w-6 rounded-full bg-stone-900 opacity-20"></div>;
            })}
            <span className="ml-2 font-semibold">4.5/5</span>
          </div>
          <div className="mt-4 flex w-full flex-col font-roboto">
            <p className=" bg-amber-300 px-4 py-1 text-lg ">Submit a review:</p>
            <form className="flex w-full flex-col gap-2 bg-stone-900 px-4 py-2 text-sm">
              <div className="grid w-full grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-50">{'Your name (optional):'}</label>
                  <input type="text" className=" bg-gray-50 p-2"></input>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-50 ">Rating:</label>
                  <select className="h-full bg-gray-50 p-2 " defaultValue={5}>
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => {
                      return (
                        <option value={rating} key={'rating-select-' + rating}>
                          {rating}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-50">Review:</label>
                <textarea className="bg-gray-50 p-2" />
              </div>

              <div className="my-1 flex items-end justify-end">
                <button className="transition-bg bg-amber-400 px-4 py-2  duration-100 hover:bg-amber-300 active:bg-amber-200 ">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="font-roboto text-stone-900">
            {reviews.map((review) => {
              return (
                <div key={'review-' + review.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-lg">
                    <FaUserCircle />
                    <p className="font-semibold">
                      {review.reviewer && review.reviewer !== '' ? review.reviewer : 'Anonymous'}
                    </p>
                    <span className="mt-1 text-xs">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Rating rating={review.rating} />
                  {review.content && <p>{review.content}</p>}
                </div>
              );
            })}
          </div>
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
  const cheese = cheeseQuery.cheese;
  if (!cheese)
    return {
      notFound: true
    };

  const similarCheesesQuery = await getCheesesByCategories({
    name_in: cheese.categories.map((category) => category.name)
  });

  const cheeseReviewsQuery = await getCheeseReviews({ cheeseId: cheese.id });
  const similarCheeses = similarCheesesQuery.categories
    .flatMap((cat) => cat.cheeses)
    .filter((cheese) => cheese.id !== cheese.id);

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
      cheese: cheese,
      reviews: cheeseReviewsQuery.reviews,
      similarCheeses: ratedSimilarCheeses
    },
    revalidate: 15
  };
};

export default CheesePage;
