/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query AllCheeses {\n    cheeses(first: 1000) {\n      id\n      name\n      slug\n      price\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n": types.AllCheesesDocument,
    "\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      price\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n": types.CheeseDocument,
    "\n  query CheeseReviews($cheeseId: ID = \"\") {\n    reviews(where: { cheese: { id: $cheeseId } }, orderBy: createdAt_DESC) {\n      id\n      createdAt\n      content\n      rating\n      reviewer\n    }\n  }\n": types.CheeseReviewsDocument,
    "\n  query CheesesByCategories($name_in: [String] = \"\") {\n    categories(where: { name_in: $name_in }) {\n      name\n      id\n      cheeses {\n        ... on Cheese {\n          id\n          name\n          slug\n          price\n          image {\n            url\n          }\n          categories {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CheesesByCategoriesDocument,
    "\n  query ReviewRatingsByCheeseIds($cheeseIds: [ID] = \"\") {\n    reviews(where: { cheese: { id_in: $cheeseIds } }, last: 100) {\n      id\n      rating\n      cheese {\n        id\n      }\n    }\n  }\n": types.ReviewRatingsByCheeseIdsDocument,
    "\n  mutation CreateCheeseReview($rating: Int!, $reviewer: String = \"\", $content: String = \"\", $cheeseId: ID!) {\n    createReview(\n      data: { rating: $rating, reviewer: $reviewer, content: $content, cheese: { connect: { id: $cheeseId } } }\n    ) {\n      id\n    }\n  }\n": types.CreateCheeseReviewDocument,
    "\n  mutation PublishCheeseReview($id: ID = \"\") {\n    publishReview(where: { id: $id }) {\n      id\n    }\n  }\n": types.PublishCheeseReviewDocument,
};

export function graphql(source: "\n  query AllCheeses {\n    cheeses(first: 1000) {\n      id\n      name\n      slug\n      price\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllCheeses {\n    cheeses(first: 1000) {\n      id\n      name\n      slug\n      price\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      price\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      price\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query CheeseReviews($cheeseId: ID = \"\") {\n    reviews(where: { cheese: { id: $cheeseId } }, orderBy: createdAt_DESC) {\n      id\n      createdAt\n      content\n      rating\n      reviewer\n    }\n  }\n"): (typeof documents)["\n  query CheeseReviews($cheeseId: ID = \"\") {\n    reviews(where: { cheese: { id: $cheeseId } }, orderBy: createdAt_DESC) {\n      id\n      createdAt\n      content\n      rating\n      reviewer\n    }\n  }\n"];
export function graphql(source: "\n  query CheesesByCategories($name_in: [String] = \"\") {\n    categories(where: { name_in: $name_in }) {\n      name\n      id\n      cheeses {\n        ... on Cheese {\n          id\n          name\n          slug\n          price\n          image {\n            url\n          }\n          categories {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CheesesByCategories($name_in: [String] = \"\") {\n    categories(where: { name_in: $name_in }) {\n      name\n      id\n      cheeses {\n        ... on Cheese {\n          id\n          name\n          slug\n          price\n          image {\n            url\n          }\n          categories {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query ReviewRatingsByCheeseIds($cheeseIds: [ID] = \"\") {\n    reviews(where: { cheese: { id_in: $cheeseIds } }, last: 100) {\n      id\n      rating\n      cheese {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query ReviewRatingsByCheeseIds($cheeseIds: [ID] = \"\") {\n    reviews(where: { cheese: { id_in: $cheeseIds } }, last: 100) {\n      id\n      rating\n      cheese {\n        id\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation CreateCheeseReview($rating: Int!, $reviewer: String = \"\", $content: String = \"\", $cheeseId: ID!) {\n    createReview(\n      data: { rating: $rating, reviewer: $reviewer, content: $content, cheese: { connect: { id: $cheeseId } } }\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCheeseReview($rating: Int!, $reviewer: String = \"\", $content: String = \"\", $cheeseId: ID!) {\n    createReview(\n      data: { rating: $rating, reviewer: $reviewer, content: $content, cheese: { connect: { id: $cheeseId } } }\n    ) {\n      id\n    }\n  }\n"];
export function graphql(source: "\n  mutation PublishCheeseReview($id: ID = \"\") {\n    publishReview(where: { id: $id }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation PublishCheeseReview($id: ID = \"\") {\n    publishReview(where: { id: $id }) {\n      id\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;