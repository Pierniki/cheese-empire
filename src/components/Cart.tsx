import _ from 'lodash';
import React, { useContext } from 'react';
import { z } from 'zod';

type Cart = {
  [id: string]: CartItem;
};

const cartSchema = z.record(z.object({ id: z.string(), quantity: z.number() }));

type CartItem = {
  id: string;
  quantity: number;
};

const CartContext = React.createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}>({
  items: [],
  addItem: () => {
    //
  },
  removeItem: () => {
    //
  }
});

export const useCart = () => {
  const cartContext = useContext(CartContext);
  return cartContext;
};

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = React.useState<Cart>();

  React.useEffect(() => {
    const raw = window.localStorage.getItem('cart');
    if (!raw) return setCart({});
    const parsed = cartSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return setCart({});
    setCart(parsed.data);
  }, []);

  React.useEffect(() => {
    if (cart === undefined) return;
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: CartItem) => {
    const currentValue = cart ? cart[item.id] : undefined;
    const newItemValue = currentValue ? { ...currentValue, quantity: currentValue.quantity + item.quantity } : item;
    setCart({ ...cart, [item.id]: newItemValue });
  };

  const removeItem = (id: string) => {
    setCart(_.omit(cart, id));
  };
  return (
    <CartContext.Provider value={{ items: Object.values(cart ?? []), addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
