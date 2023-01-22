import { GraphQLClient } from "graphql-request";
import { constants } from "helpers";

const GRAPHQL_ENDPOINT = `${constants.BASE_URL}/graphql`;

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  credentials: "include",
  mode: "cors",
});

export const queryOptions = {
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
};

// export const queryClient = new QueryClient(queryOptions);
