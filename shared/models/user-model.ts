import {CartModel} from "@/shared/models/cart-model";
import {OrderModel} from "@/shared/models/order-model";

export enum UserRoles {
    Admin= "ADMIN",
    User= "USER",
}

export interface UserModel {
    id: number
    fullName: string
    email: string
    password: string
    role: UserRoles
    provider: string
    providerId: string
    verified: boolean
    cart: CartModel
    order: OrderModel
}