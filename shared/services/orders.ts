import { axiosInstance } from '@/shared/services/instance';
import { OrderModel } from '@/shared/models/order-model';
import { TCheckoutFormValues } from '@/shared/components/shared/checkout/schemas/checkout-form-schema';


export const create = async (formValues: TCheckoutFormValues) => {
  const { data } = await axiosInstance.post<{ url: string, order: OrderModel }>('/order', formValues);

  return data;
};