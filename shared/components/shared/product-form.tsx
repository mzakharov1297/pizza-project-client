"use client"

import React from 'react';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';
import { ProductModel } from '@/shared/models/product-model';
import ChoosePizzaForm from '@/shared/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/shared/choose-product-form';
import { useRouter } from 'next/navigation';

const ProductForm = ({product, isModal}: {
  product: ProductModel,
  isModal?: boolean
}) => {
  const router = useRouter();

  const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);
  const firstItem = product.productItems[0];
  const isPizzaForm = !!firstItem.pizzaType;



  const onAddProduct = async () => {
    await addCartItem({
      productId: firstItem.id,
    })
  };

  const onAddPizza = async (productItemId?: number, ingredients?: number[]) => {
    await addCartItem({
      productId: productItemId!,
      ingredients,
    });

  };

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (isPizzaForm) {
        await toast.promise(
          onAddPizza(productItemId, ingredients),
          {
            loading: 'Добавляем пиццу в корзину...',
            success: 'Пицца добавлена в корзину',
            error: 'Не удалось добавить пиццу в корзину',
          },
        );
      } else {
        await toast.promise(
          onAddProduct(),
          {
            loading: 'Добавляем товар в корзину...',
            success: 'Товар добавлен в корзину',
            error: 'Не удалось добавить товар в корзину',
          },
        );

      }
    } catch (e) {
      toast.error(`Не удалось добавить ${isPizzaForm ? 'пиццу' : 'товар'} в корзину`);
      console.error(e);
    }finally {
      if (isModal) {
        router.back()
      }
    }

  };

 if (isPizzaForm) {
   return (
     <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients}
                      items={product.productItems} onSubmit={onSubmit} loading={loading} />
   )
 }

 return (
   <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={onSubmit}
                      price={product.productItems[0].price} loading={loading} />
 )
};

export default ProductForm;