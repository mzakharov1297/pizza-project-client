import { CategoryModel } from '@/shared/models/category-model';
import { axiosInstance } from '@/shared/services/instance';

export interface CategoriesSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  pizzaTypes?: string
  priceFrom?: string
  priceTo?: string
  ingredients?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: CategoriesSearchParams) => {
  const sizes = params.sizes ? params.sizes.split(',').map(Number) : []
  const pizzaTypes = params.pizzaTypes ? params.pizzaTypes.split(',').map(Number) : []
  const ingredientsIds = params.ingredients ? params.ingredients.split(',').map(Number) : []

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE
try {
  const { data } = await axiosInstance.get<CategoryModel[]>('/category', {
    params: {
      ...params,
      sizes,
      pizzaTypes,
      priceFrom: minPrice,
      priceTo: maxPrice,
      ingredients: ingredientsIds
    }
  })

  return data
}catch (e){
  console.log(e);
}

}