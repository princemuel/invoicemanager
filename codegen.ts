import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // schema: process.env.SCHEMA_PATH,
  schema: './src/lib/schema/schema.gql',
  documents: './src/lib/graphql/**/*.{graphql,gql}',
  watch: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/hooks/react-query.ts': {
      // preset: 'client',
      config: {
        noNamespaces: true,
        pureMagicComment: true,
        useTypeImports: true,
        typesPrefix: '',
        skipTypename: true,
        declarationKind: 'interface',
        exposeQueryKeys: true,
        maybeValue: 'T',
        exposeFetcher: true,
        fetcher: 'graphql-request',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
  },
};

export default config;
