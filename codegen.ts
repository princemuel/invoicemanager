import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/lib/schema/schema.gql',
  // schema: 'https://invoicemailer.onrender.com/api/graphql',
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
        typesSuffix: 'Type',
        skipTypename: true,
        declarationKind: 'interface',
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        maybeValue: 'T',
        exposeFetcher: true,
        legacyMode: false,
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
