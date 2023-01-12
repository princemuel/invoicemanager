import { connectionPlugin, makeSchema } from "nexus";
import * as path from "path";
import { guardPlugin } from "./plugins";
import * as typeDefs from "./resolvers";

export const schema = makeSchema({
  types: typeDefs,
  plugins: [connectionPlugin(), guardPlugin],
  outputs: {
    typegen: path.join(process.cwd(), "lib", "generated", "typegen.d.ts"),
    schema: path.join(process.cwd(), "lib", "generated", "schema.graphql"),
  },

  contextType: {
    export: "Context",
    module: path.join(process.cwd(), "lib", "database", "context.ts"),
  },
  nonNullDefaults: {
    input: true,
    output: false,
  },
});
