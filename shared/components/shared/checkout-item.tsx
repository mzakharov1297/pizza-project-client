import React, { FC } from 'react';
import { CountButtonProps } from '@/shared/components/shared/count-button';
import { CartItemProps } from '@/shared/components/shared/cart-item-details/cart-item-details.types';
import { cn } from '@/shared/lib/utils';
import * as CartItemDetails from '../shared/cart-item-details';
import { IngredientsModel } from '@/shared/models/ingredients-model';
import { X } from 'lucide-react';


interface Props extends CartItemProps {
  onClickRemove: () => void
  onClickCountButton: CountButtonProps['onClick'],
  className?: string
}

const CheckoutItem: FC<Props> = ({
                               name,
                               price,
                               imageUrl,
                               quantity,
                               className,
                               onClickCountButton,
                               details,
                               onClickRemove,
                             }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className={'flex items-center gap-5 flex-1'}>
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info  details={details} name={name} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className={'flex items-center gap-5 ml-20'}>
        <CartItemDetails.CountButton value={quantity} onClick={onClickCountButton} />
        <button type={"button"} onClick={onClickRemove}>
          <X className={'text-gray-400 cursor-pointer hover:text-gray-600'} size={20}/>
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;