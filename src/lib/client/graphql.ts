import { constants } from '@src/helpers';
import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = `${constants.BASE_URL}/api/graphql`;

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  credentials: 'include',
  mode: 'cors',
});
