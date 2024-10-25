import {ProductModel} from "@/models/product-model";

export interface CategoryModel {
    id: number
    name: string
    products: ProductModel[]
}