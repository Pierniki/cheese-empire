import type { AppType } from 'next/dist/shared/lib/utils';
import { Layout } from '@/components/Layout';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarContextProvider } from '@/components/Snackbar';
import { CartContextProvider } from '@/components/Cart';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <SnackbarContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
