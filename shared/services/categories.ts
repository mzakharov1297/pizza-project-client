import {CategoryModel} from "@/shared/models/category-model";
import {axiosInstance} from "@/shared/services/instance";


export const getAll = async () => {
    const {data} = await axiosInstance.get<CategoryModel[]>("/category",);

    return data
}