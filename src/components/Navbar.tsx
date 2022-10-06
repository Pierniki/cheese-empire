import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <div className="relative z-10 w-full overflow-hidden bg-yellow-50 shadow-lg">
      <div className="container relative z-10 mx-auto flex items-center justify-center px-16">
        <Divider />
        <Link passHref href="/">
          <div className="relative flex cursor-pointer flex-col items-center p-8">
            <h2 className="min-w-[350px] text-center font-pacifico text-5xl font-bold text-stone-900">Cheese Empire</h2>
            <span className="z-10 mt-2 font-pacifico text-lg text-amber-500">{"Feelin' cheesy?"}</span>
          </div>
        </Link>
        <Divider />
      </div>
    </div>
  );
};

const Divider = () => <div className="w-full border-b-4 border-stone-900" />;
