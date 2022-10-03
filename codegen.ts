import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl8suah0k41u501t8870qd24t/master',
  documents: 'src/**/*.tsx',
  generates: {
    'src/gql': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request']
    }
  }
};

export default config;
