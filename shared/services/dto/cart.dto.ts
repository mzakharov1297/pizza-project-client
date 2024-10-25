import {ProductItemsModel} from "@/shared/models/product-items";
import {ProductModel} from "@/shared/models/product-model";
import {IngredientsModel} from "@/shared/models/ingredients-model";
import {CartModel} from "@/shared/models/cart-model";

export type CartItemDTO =  {
    quantity: number;
    productItem: ProductItemsModel & {
        product: ProductModel;
    };
    ingredients: IngredientsModel[];
};

export interface CartDTO extends CartModel {
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productItemId: number;
    ingredients?: number[];
}