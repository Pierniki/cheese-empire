import { env } from './src/env/server.mjs';
import bundleAnalyzer from '@next/bundle-analyzer';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: env.ANALYZE === 'true'
});

function defineNextConfig(config) {
  return config;
}

export default withBundleAnalyzer(
  defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    images: { domains: ['media.graphassets.com'] },
    i18n: {
      locales: ['en'],
      defaultLocale: 'en'
    }
  })
);
