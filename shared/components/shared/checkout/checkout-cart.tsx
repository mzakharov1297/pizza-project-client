import React, { FC } from 'react';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import CheckoutItem from '@/shared/components/shared/checkout-item';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '@/shared/components/shared/checkout-item-skeleton';

interface Props {
  className?: string
  items: CartStateItem[]
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
  removeCartItem: (id: number) => void,
  loading: boolean
}

const CheckoutCart: FC<Props> = ({ className, items, onClickCountButton, removeCartItem, loading }) => {
  return (
    <WhiteBlock className={className} title={'1. Корзина'}>
      <div className={'flex flex-col gap-5'}>
        {
          loading && items.length <=0 && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
        }
        {
         items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={item.pizzaType && item.pizzaSize ? getCartItemDetails(item.ingredients, item.pizzaType, item.pizzaSize) : ''}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              disabled={item.disabled}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))
        }
      </div>

    </WhiteBlock>
  );
};

export default CheckoutCart;