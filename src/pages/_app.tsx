import type { AppType } from 'next/dist/shared/lib/utils';
import { Layout } from '@/components/Layout';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarContextProvider } from '@/components/Snackbar';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
