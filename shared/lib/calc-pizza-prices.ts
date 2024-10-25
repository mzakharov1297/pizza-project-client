import {ProductItemsModel} from "@/shared/models/product-items";
import {IngredientsModel} from "@/shared/models/ingredients-model";
import {PizzaSize, PizzaType} from "@/shared/consts/pizza";

export const calcPizzaPrices = (
    items: ProductItemsModel[],
    ingredients: IngredientsModel[],
    selectedIngredients: Set<number>,
    type: PizzaType,
    size: PizzaSize
) => {
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price
    const totalIngredientPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0)

    return {pizzaPrice, totalIngredientPrice}
}