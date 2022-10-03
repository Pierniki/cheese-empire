import { gql, GraphQLClient } from 'graphql-request';
import { env } from '../env/client.mjs';

export default new GraphQLClient(env.NEXT_PUBLIC_HYGRAPH_ENDPOINT);

export { gql };
