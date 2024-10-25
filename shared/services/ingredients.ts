import {IngredientsModel} from "@/shared/models/ingredients-model";
import {axiosInstance} from "@/shared/services/instance";


export const getAll = async () => {
    const {data} = await axiosInstance.get<IngredientsModel[]>("/ingredient",);

    return data
}