module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts,.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  env: {
    amd: true,
    browser: true,
    es2022: true,
    node: true,
  },
  plugins: [
    'prettier',
    'jsx-a11y',
    'react',
    'react-hooks',
    'import',
    '@typescript-eslint',
  ],
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    import: 0,
    'no-console': 'off',
    // 'import/extensions': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/prefer-default-export': 'off',
    // 'import/no-default-export': 'off',
    // 'import/no-extraneous-dependencies': 'warn',
    // 'import/order': [
    //   'warn',
    //   {
    //     'newlines-between': 'never',
    //     groups: [
    //       'builtin', // Built-in types are first
    //       ['external', 'internal'],
    //       ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
    //       'index', // Then the index file
    //       'object',
    //       // Then the rest: internal and external type
    //     ],
    //   },
    // ],
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['a'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        assert: 'either',
      },
    ],
    'no-unused-vars': 'off',
    'prettier/prettier': ['off', { usePrettierrc: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        typedefs: true,
      },
    ],
  },
};
