import {pizzaSizes, PizzaType} from "@/shared/consts/pizza";
import {ProductItemsModel} from "@/shared/models/product-items";
import {Variant} from "@/shared/components/shared/group-variants";

export const getAvailablePizzaSizes = (items: ProductItemsModel[], type: PizzaType): {
    availablePizzas: Variant[],
    filteredPizzasByType: ProductItemsModel[]
} => {
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type)
    const availablePizzas = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(pizza => pizza.size === Number(item.value))
    }))

    return {availablePizzas, filteredPizzasByType}
}