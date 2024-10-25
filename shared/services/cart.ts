import { CartModel } from '@/shared/models/cart-model';
import { axiosInstance } from '@/shared/services/instance';

export const getCart = async () => {
  const {data} = await axiosInstance.get<CartModel>("/cart", {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data
}

export const updateItemQuantity = async (itemId: number, quantity: number):Promise<CartModel> => {
  const {data} = await axiosInstance.patch<CartModel>("/cart/" + itemId, {
    quantity
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return data
}

export const removeItem = async (itemId: number):Promise<CartModel>   => {
  const {data} = await axiosInstance.delete<CartModel>("/cart/" + itemId, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return data
}

export const addCartItem = async (values: {productId: number, ingredients?: number[]}):Promise<CartModel> => {
  const {data} = await axiosInstance.post("/cart",values, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return data
}