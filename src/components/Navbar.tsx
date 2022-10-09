import Link from 'next/link';
import React from 'react';
import { useCart } from './Cart';
import { HiShoppingCart } from 'react-icons/hi';

export const Navbar = () => {
  const { items } = useCart();
  return (
    <div className="relative z-10 w-full  bg-yellow-50 shadow-lg">
      <nav className="container relative z-30 mx-auto flex flex-row items-center justify-between  px-8 sm:justify-center sm:px-16">
        <div className="hidden w-full sm:block" />
        <Link passHref href="/">
          <div className="relative flex cursor-pointer flex-col items-start py-4 sm:items-center sm:px-8">
            <h2 className="min-w-[250px] text-start font-pacifico text-4xl font-bold text-stone-900 sm:min-w-[350px] sm:text-center sm:text-5xl">
              Cheese Empire
            </h2>
            <span className="z-10 mt-2 font-pacifico text-amber-500 sm:text-lg">{"Feelin' cheesy?"}</span>
          </div>
        </Link>
        <div className="relative top-2  z-20 flex flex-col items-center gap-2 text-stone-900 sm:w-full sm:items-end sm:px-4">
          <Link passHref href="/cart">
            <button className="relative text-3xl duration-100 hover:text-stone-800 active:text-stone-700">
              <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 font-roboto text-sm font-semibold text-gray-50">
                {items.length}
              </div>

              <HiShoppingCart />
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};
