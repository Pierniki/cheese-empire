import React from 'react';
import { seoConfig as SEO } from '@/seo/nextSeoConfig';
import { DefaultSeo } from 'next-seo';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <div className="flex min-h-screen flex-col overflow-y-auto scroll-smooth bg-yellow-50 antialiased">
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </div>
    </>
  );
};
