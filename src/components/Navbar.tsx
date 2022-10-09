import Link from 'next/link';
import React from 'react';
import { useCart } from './Cart';
import { HiShoppingCart } from 'react-icons/hi';

export const Navbar = () => {
  const { items } = useCart();
  return (
    <div className="relative z-20 w-full  bg-yellow-50 shadow-lg">
      <div className="container relative z-30  mx-auto flex flex-col items-center justify-center px-16 sm:flex-row">
        <Divider />
        <Link passHref href="/">
          <div className="relative flex cursor-pointer flex-col items-center px-8 py-4">
            <h2 className="min-w-[350px] text-center font-pacifico text-4xl font-bold text-stone-900 sm:text-5xl">
              Cheese Empire
            </h2>
            <span className="z-10 mt-2 font-pacifico text-amber-500 sm:text-lg">{"Feelin' cheesy?"}</span>
          </div>
        </Link>
        <div className="relative top-2 z-20  flex w-full flex-col items-center gap-2 px-4 text-stone-900 sm:items-end">
          <Link passHref href="/cart">
            <button className="relative text-3xl duration-100 hover:text-stone-700 active:text-stone-600">
              <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 font-roboto text-sm font-semibold text-gray-50">
                {items.length}
              </div>

              <HiShoppingCart />
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute -bottom-4 z-10 flex w-full justify-center sm:hidden  ">
        <div className="h-8 w-8 rotate-45 bg-yellow-50 lg:h-16 lg:w-16"></div>
      </div>
    </div>
  );
};

const Divider = () => <div className="w-full  border-stone-900 px-4" />;
