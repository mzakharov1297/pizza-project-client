import { calcCartItemTotalPrice } from '@/shared/lib/calc-cart-item-total-price';
import { CartModel } from '@/shared/models/cart-model';
import { PizzaSize, PizzaType } from '@/shared/consts/pizza';

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    pizzaSize?: PizzaSize;
    pizzaType?: PizzaType ;
    ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartModel): ReturnProps => {
    const items = data.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        pizzaSize: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        disabled: false,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price
        }))
    })) as CartStateItem[]

    return {
        items,
        totalAmount: data.totalAmount,
    };
};