import { axiosInstance } from '@/shared/services/instance';
import { IngredientsModel } from '@/shared/models/ingredients-model';

export const sendEmail = async (to: string, subject: string, template: string) => {
  const {data} = await axiosInstance.post("/email",{
    to,
    subject,
    template,
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return data
}