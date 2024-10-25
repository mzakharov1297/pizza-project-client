import {UserModel} from "@/shared/models/user-model";
import {CartItemsModel} from "@/shared/models/cart-items-model";

export enum OrderStatus {
    Pending = "PENDING",
    Succeeded = "SUCCEEDED",
    Canceled = "CANCELED"
}


export interface OrderModel {
    id: number;
    user: UserModel
    token: string
    status: OrderStatus
    paymentId: string
    items: CartItemsModel[]
    fullName: string
    address: string
    email: string
    phone: string
    comment: string
    totalAmount: number
}