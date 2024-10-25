import {ProductModel} from "@/shared/models/product-model";
import {axiosInstance} from "@/shared/services/instance";


export const search = async (query: string) => {
    const {data} = await axiosInstance.get<ProductModel[]>("/product", {
        params: {
            name: query
        }
    });

    return data
}

export const getProductById = async (id: string) => {
    const {data} = await axiosInstance.get<ProductModel>(`/product/${id}`, {
        params: {
            id: id
        }
    })
    return data
}