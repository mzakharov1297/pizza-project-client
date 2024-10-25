import axios from 'axios';


//TODO перенести на сервер
export async function createPayment(details: any){
  const { data } = await axios.post('https://api.yookassa.ru/v3/payment', {
    amount: {
      value: details.amount,
      currency: 'RUB',
    },
    capture: true,
    description: 'any',
    metadata: {
      order_id: details.order_id,
    },
    confirmation: {
      type: 'redirect',
      return_url: "http://localhost:3000/?paid",
    },
  }, {
    auth: {
      username: process.env.NEXT_PUBLIC_YUMONEY_API as string,
      password: ''
    },
    headers: {
      "Idempotence-Key": Math.random().toString(36).substring(7)
    }
  });

  return data
}