import { CheesePageView } from '@/components/CheesePageView/CheesePageView';
import { getAllCheeses } from '@/lib/getAllCheeses';
import { getCheese } from '@/lib/getCheese';
import { getCheeseReviews } from '@/lib/getCheeseReviews';
import { getCheesesByCategories } from '@/lib/getCheesesByCategories';
import { getRatingByCheeseIds } from '@/lib/getRatingByCheeseIds';
import { getRatingFromReviews } from '@/utils/getRatingFromReviews';
import { InferNextProps } from '@/utils/InferStaticProps';
import { groupBy } from 'lodash';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const CheesePage: NextPage<InferNextProps<typeof getStaticProps>> = (props) => {
  const router = useRouter();
  if (router.isFallback) return null;
  return <CheesePageView {...props} />;
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

  const thisCheeseReviews = await getCheeseReviews({ cheeseId: cheese.id, page: 0, perPage: 5 }).then((res) => ({
    reviews: res.reviews.map((review) => ({ ...review, createdAt: new Date(review.createdAt).toDateString() })),
    allCount: res.reviewsConnection.aggregate.count
  }));
  const similarCheeses = similarCheesesQuery.categories
    .flatMap((cat) => cat.cheeses)
    .filter((similarCheese) => similarCheese.id !== cheese.id);

  const reviews = await getRatingByCheeseIds({
    cheeseIds: [...similarCheeses.map((cheese) => cheese.id), cheese.id]
  });
  const reviewsByCheese = groupBy(reviews.reviews, 'cheese.id');

  const ratedSimilarCheeses = similarCheeses.map((cheese) => ({
    ...cheese,
    rating: getRatingFromReviews(reviewsByCheese[cheese.id] ?? [])
  }));

  return {
    props: {
      cheese: { ...cheese, averageRating: getRatingFromReviews(reviewsByCheese[cheese.id] ?? []) },
      initialReviews: thisCheeseReviews,
      similarCheeses: ratedSimilarCheeses
    },
    revalidate: 15
  };
};

export default CheesePage;
