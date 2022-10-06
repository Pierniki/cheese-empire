import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl8suah0k41u501t8870qd24t/master',
  documents: 'src/lib/*.ts',
  verbose: true,
  generates: {
    'src/gql': {
      config: {
        operationResultSuffix: 'Result',
        onlyOperationTypes: true
      },
      preset: 'client',
      plugins: []
    }
  }
};

export default config;
