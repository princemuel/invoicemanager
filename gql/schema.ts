import { connectionPlugin, makeSchema } from "nexus";
import * as path from "path";
import * as typeDefs from "./resolvers";

export const schema = makeSchema({
  types: typeDefs,
  plugins: [connectionPlugin()],
  outputs: {
    typegen: path.join(process.cwd(), "generated", "nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated", "schema.gql"),
  },
  contextType: {
    export: "Context",
    module: path.join(process.cwd(), "gql", "context.ts"),
  },
  nonNullDefaults: {
    output: true,
  },
});
