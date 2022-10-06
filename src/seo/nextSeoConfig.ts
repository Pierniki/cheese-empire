import { DefaultSeoProps } from 'next-seo';

export const seoConfig: DefaultSeoProps = {
  title: 'Cheese Empire',
  description: 'Fake website about cheese',
  additionalLinkTags: [{ rel: 'icon', href: '/favicon.ico' }],
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://cheese-empire.vercel.app',
    site_name: 'CheeseEmpire'
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image'
  }
};
