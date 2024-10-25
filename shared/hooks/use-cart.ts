import { useCartStore } from '@/shared/store/cart';
import { useEffect } from 'react';
import { CartItemsModel } from '@/shared/models/cart-items-model';
import { CartStateItem } from '@/shared/lib/get-cart-details';

type ReturnProps = {
  totalAmount: number,
  items: CartStateItem[],
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: { productId: number, ingredients?: number[] }) => Promise<void>;
  loading: boolean
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(
    (state) => state,
  );

  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};