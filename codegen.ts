import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl8suah0k41u501t8870qd24t/master',
  documents: 'src/**/*.ts',

  generates: {
    'src/gql': {
      config: {
        flattenGeneratedTypes: true,
        flattenGeneratedTypesIncludeFragments: true,
        exportFragmentSpreadSubTypes: true,
        mergeFragmentTypes: true
      },
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request']
    }
  }
};

export default config;
