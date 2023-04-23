import { constants } from '@src/helpers';
import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = `${constants.BASE_URL}/api/graphql`;

//  process?.env?.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  credentials: 'include',
  mode: 'cors',
});
