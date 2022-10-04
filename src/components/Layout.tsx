import React from 'react';
import { seoConfig as SEO } from '../seo/nextSeoConfig';
import { DefaultSeo } from 'next-seo';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <div className="min-h-screen overflow-y-auto scroll-smooth bg-[#fff3d4] antialiased">
        {children}
        <footer className="min-h-[300px] "></footer>
      </div>
    </>
  );
};
