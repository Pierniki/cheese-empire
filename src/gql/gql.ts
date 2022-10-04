/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query AllCheeses {\n    cheeses {\n      id\n      name\n      slug\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n": types.AllCheesesDocument,
    "\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n": types.CheeseDocument,
    "\n  query CheesesByCategories($name_in: [String] = \"\") {\n    categories(where: { name_in: $name_in }) {\n      name\n      id\n      cheeses {\n        ... on Cheese {\n          id\n          name\n          slug\n          image {\n            url\n          }\n          categories {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CheesesByCategoriesDocument,
};

export function graphql(source: "\n  query AllCheeses {\n    cheeses {\n      id\n      name\n      slug\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllCheeses {\n    cheeses {\n      id\n      name\n      slug\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query CheesesByCategories($name_in: [String] = \"\") {\n    categories(where: { name_in: $name_in }) {\n      name\n      id\n      cheeses {\n        ... on Cheese {\n          id\n          name\n          slug\n          image {\n            url\n          }\n          categories {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CheesesByCategories($name_in: [String] = \"\") {\n    categories(where: { name_in: $name_in }) {\n      name\n      id\n      cheeses {\n        ... on Cheese {\n          id\n          name\n          slug\n          image {\n            url\n          }\n          categories {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;