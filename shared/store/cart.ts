import { CartItemsModel } from '@/shared/models/cart-items-model';
import { create } from 'zustand';
import { Api } from '@/shared/services/api-client';
import { CartStateItem, getCartDetails } from '@/shared/lib/get-cart-details';


export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: { productId: number, ingredients?: number[] }) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map((item) => (item.id === id) ? { ...item, disabled: true } : item),
      }));
      const data = await Api.cart.removeItem(id);
      set(getCartDetails(data));
      const updatedData = await Api.cart.getCart();
      set(getCartDetails(updatedData));
    } catch (error) {
      set({ error: true });
    } finally {
      set(state => ({
        loading: false,
        items: state.items.map((item) => (item.id === id) ? { ...item, disabled: false } : item),
      }));
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: { productId: number, ingredients?: number[] }) => {
    if (!values.ingredients || values.ingredients.length === 0) {
      values.ingredients = [];
    }
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));