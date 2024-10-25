'use client';

import React from 'react';
import { Container } from '@/shared/components/shared/container';
import { Title } from '@/shared/components/shared/title';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import { Button, Input } from '@/shared/components/ui';
import { Textarea } from '@/shared/components/ui/textarea';
import CheckoutItemDetails from '@/shared/components/shared/checkout-item-details';
import { cn } from '@/shared/lib/utils';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import CheckoutItem from '@/shared/components/shared/checkout-item';
import { CheckoutItemSkeleton } from '@/shared/components/shared/checkout-item-skeleton';
import { useCart } from '@/shared/hooks/use-cart';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import FormInput from '@/shared/components/shared/form/form-input';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckoutCart from '@/shared/components/shared/checkout/checkout-cart';
import CheckoutPersonalForm from '@/shared/components/shared/checkout/checkout-personal-form';
import CheckoutAddressForm from '@/shared/components/shared/checkout/checkout-address-form';
import CheckoutSidebar from '@/shared/components/shared/checkout-sidebar';
import {
  checkoutFormSchema,
  TCheckoutFormValues,
} from '@/shared/components/shared/checkout/schemas/checkout-form-schema';
import { Api } from '@/shared/services/api-client';
import { OrderStatus } from '@/shared/models/order-model';
import { sendEmail } from '@/shared/lib/send-email';
import PayOrder from '@/shared/components/shared/email-templates/pay-order';
import { emailAction } from '@/app/actions';
import { createPayment } from '@/shared/lib/create-payment';

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);


  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const { loading, totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity).then();
  };
  const vatPrice = Math.round((totalAmount * VAT) / 100);
  const onSubmit: SubmitHandler<TCheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const formDTO = {
        ...data,
        items,
        totalAmount: totalAmount === 0 && vatPrice === 0 ? 0 : totalAmount + vatPrice + DELIVERY_PRICE,
        status: OrderStatus.Pending,
      };

      const orderData = await Api.order.create(formDTO);

      const paymentData = await createPayment({
        amount: orderData.order.totalAmount,
        order_id: orderData.order.id,
        description: "Оплата заказа #" + orderData.order.id
      })

      console.log(paymentData);
      // if (orderData.url) {
      //   location.href = orderData.url;
      // }

      await Api.email.sendEmail(orderData.order.email, 'Оплата', `
          <div>
            <h1>Заказ номер #${orderData.order.id}</h1>
            <p>Оплатите заказ на сумму <b>${orderData.order.totalAmount} ₽</b>. Перейдите <a href="${orderData.url}">по этой ссылке</a> для оплаты заказа.</p>
         </div>
      `);

    } catch (e) {
      console.log(e);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }

  };

  return (
    <Container className="mt-10">
      <Title text={'Оформление заказа'} className={'font-extrabold mb-8 text-[36px]'} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'flex gap-10'}>
            <div className={'flex flex-col gap-10 flex-1 mb-20'}>

              <CheckoutCart loading={loading} className={loading ? 'opacity-40 pointer-events-none' : ''} items={items}
                            onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} />
              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

            </div>

            <div className={'w-[450px]'}>
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>

      </FormProvider>

    </Container>
  );
}