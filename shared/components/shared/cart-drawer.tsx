'use client';

import React, { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from '@/shared/components/shared/cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { useCartStore } from '@/shared/store/cart';
import { Title } from '@/shared/components/shared/title';
import empty from '../../../public/asset/images/empty-box.png';
import { clsx } from 'clsx';
import { useCart } from '@/shared/hooks/use-cart';

interface Props {
  className?: string;
}

const CartDrawer: FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
const {loading, totalAmount, items, updateItemQuantity, removeCartItem, } = useCart()
  const [redirecting, setRedirecting] = useState(false)

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity).then();
  };



  return (
    <div className={cn('', className)}>
      <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent className={'flex flex-col justify-between pb-0 bg-[#F4F1EE]'}>
          <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>

            {totalAmount > 0 && <SheetHeader>
              <SheetTitle>
                В корзине <span className={'font-bold'}>{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>}
            {!totalAmount && (
              <div className="flex flex-col items-center justify-center w-72 mx-auto">
                <Image src={empty} alt="Empty cart" width={120} height={120} />
                <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
                <p className="text-center text-neutral-500 mb-5">
                  Добавьте хотя бы одну пиццу, чтобы совершить заказ
                </p>

                <SheetClose>
                  <Button className="w-56 h-12 text-base" size="lg">
                    <ArrowLeft className="w-5 mr-2" />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            )}

            {
              totalAmount > 0 &&
              <>
                <div className={'-mx-6 mt-5 overflow-auto scrollbar flex-1'}>
                  {items.map((item) => {
                    return (
                      <CartDrawerItem
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
                    );
                  })}


                </div>

                <SheetFooter className={'-mx-6 bg-white p-8'}>
                  <div className={'w-full'}>
                    <div className={'flex mb-4'}>
                                <span className={'flex flex-1 text-lg text-neutral-500'}>
                                    Итого
                                    <div
                                      className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                </span>

                      <span>{totalAmount} ₽</span>
                    </div>

                    <Link href={'/checkout'}>
                      <Button
                        onClick={() =>setRedirecting(true)}
                        loading={redirecting}
                        type={'submit'}
                        className={'w-full h-12 text-base'}
                      >
                        Оформить заказ
                        <ArrowRight className={'w-5 ml-2'} />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            }

          </div>

        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartDrawer;