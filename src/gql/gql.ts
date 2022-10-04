/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n": types.CheeseDocument,
    "\n  query AllCheeses {\n    cheeses {\n      id\n      name\n      slug\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n": types.AllCheesesDocument,
};

export function graphql(source: "\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cheese($slug: String = \"\") {\n    cheese(where: { slug: $slug }) {\n      description\n      id\n      name\n      categories {\n        name\n        id\n      }\n      image {\n        url\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query AllCheeses {\n    cheeses {\n      id\n      name\n      slug\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllCheeses {\n    cheeses {\n      id\n      name\n      slug\n      image {\n        url\n      }\n      categories {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;