import {IngredientsModel} from "@/shared/models/ingredients-model";
import {CategoryModel} from "@/shared/models/category-model";
import {ProductItemsModel} from "@/shared/models/product-items";

export interface ProductModel {
    id: number;
    name: string;
    imageUrl: string
    category: CategoryModel
    ingredients: IngredientsModel[]
    productItems: ProductItemsModel[]
}

export interface ProductsDto {
    items: ProductModel[]
}