import { ApolloServer } from "apollo-server-micro";
import { createContext, schema } from "lib";
import { RequestHandler } from "micro";
import cors from "micro-cors";
import { NextApiHandler, PageConfig } from "next";

const Cors = cors();

let apolloServerHandler: RequestHandler;
const graphqlPath = "/api/graphql";

async function createApolloServerHandler() {
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: createContext,
  });

  if (!apolloServerHandler) {
    await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: graphqlPath,
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = Cors(async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const apolloServerHandler = await createApolloServerHandler();
  return apolloServerHandler(req, res);
});

export default handler;

// Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

//   cors({
//   origin: "https://studio.apollographql.com",
//   allowCredentials: true,
//   allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Credentials",
//     "Access-Control-Allow-Methods",
//   ],
// })
