import React, { FC } from 'react';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import CheckoutItemDetails from '@/shared/components/shared/checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number,
  loading: boolean
}

const CheckoutSidebar: FC<Props> = ({ totalAmount, loading }) => {

  const vatPrice = Math.round((totalAmount * VAT) / 100);

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', loading ? 'opacity-40 pointer-events-none' : '')}>
      <div className={'flex flex-col gap-1'}>
        <span className={'text-xl'}>Итого:</span>
        {
          loading ?
            <Skeleton className={'w-48 h-11'}/>
            :
            <span className={'text-[34px] font-extrabold'}>{totalAmount === 0 && vatPrice === 0 ? 0 : totalAmount + vatPrice + DELIVERY_PRICE} ₽</span>
        }

      </div>
      <CheckoutItemDetails title={
        <div className={'flex items-center'}>
        <Package size={18} className={'mr-2 text-gray-300'} />
          Стоимость товаров:
        </div>
      } value={loading ? <Skeleton className={'w-14 h-6'}/> :`${totalAmount} ₽`} />
      <CheckoutItemDetails title={
        <div className={'flex items-center'}>
          <Percent size={18} className={'mr-2 text-gray-300'} />
          Налог:
        </div>
      } value={loading ? <Skeleton className={'w-14 h-6'}/> :`${vatPrice} ₽`} />
      <CheckoutItemDetails title={
        <div className={'flex items-center'}>
          <Truck size={18} className={'mr-2 text-gray-300'} />
          Доставка:
        </div>
      } value={loading ? <Skeleton className={'w-14 h-6'}/> :`${ totalAmount === 0 && vatPrice === 0 ? 0 :DELIVERY_PRICE} ₽`} />

      <Button
        loading={loading}
        type={'submit'}
        className={'w-full h-14 rounded-2xl mt-6 text-base font-bold'}
      >
        Перейти к оплате
        <ArrowRight className={'w-5 ml-2'} />
      </Button>
    </WhiteBlock>
  );
};

export default CheckoutSidebar;