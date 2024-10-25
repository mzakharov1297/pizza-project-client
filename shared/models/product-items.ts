import { ProductModel } from '@/shared/models/product-model';

export interface ProductItemsModel {
    id: number
    price: number
    size: number
    pizzaType: number
    product: ProductModel
}