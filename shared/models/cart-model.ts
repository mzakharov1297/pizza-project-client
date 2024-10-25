import {CartItemsModel} from "@/shared/models/cart-items-model";

export interface CartModel {
    id: number
    totalAmount: number
    cartItems: CartItemsModel[]
}