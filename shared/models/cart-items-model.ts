import {ProductItemsModel} from "@/shared/models/product-items";
import {CartModel} from "@/shared/models/cart-model";
import {IngredientsModel} from "@/shared/models/ingredients-model";

export interface CartItemsModel {
    id: number
    quantity: number
    name?: string
    imageUrl?: string
    price?: number
    pizzaSize?: number | null
    type: number | null
    productItem: ProductItemsModel
    cart: CartModel
    ingredients: IngredientsModel[]
}