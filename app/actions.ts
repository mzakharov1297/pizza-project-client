import { sendEmail } from '@/shared/lib/send-email';
import PayOrder from '@/shared/components/shared/email-templates/pay-order';

export const emailAction = async ({orderId, totalAmount, url}: {orderId: number, totalAmount: number, url: string}) => {
  await sendEmail(PayOrder({
    orderId: orderId,
    totalAmount: totalAmount,
    paymentUrl: url
  }))
}