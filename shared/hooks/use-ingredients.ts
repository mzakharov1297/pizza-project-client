import {useEffect, useState} from "react";
import {Api} from "@/shared/services/api-client";
import {IngredientsModel} from "@/shared/models/ingredients-model";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<IngredientsModel[]>([])
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        async function getAllIngredient() {
            try {
                setLoading(true)
                const ingredient = await Api.ingredients.getAll()
                setIngredients(ingredient)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        getAllIngredient()

    }, []);

    return {
        ingredients,
        loading
    }
}