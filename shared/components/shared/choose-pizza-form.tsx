'use client';

import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { IngredientsModel } from '@/shared/models/ingredients-model';
import { ProductItemsModel } from '@/shared/models/product-items';
import { cn } from '@/shared/lib/utils';
import ProductImage from '@/shared/components/shared/product-image';
import { Button } from '@/shared/components/ui';
import { Title } from '@/shared/components/shared/title';
import GroupVariants from '@/shared/components/shared/group-variants';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/consts/pizza';
import IngredientItem from '@/shared/components/shared/ingredient-item';
import { useSet } from 'react-use';
import { calcPizzaPrices } from '@/shared/lib/calc-pizza-prices';
import { getAvailablePizzaSizes } from '@/shared/lib/get-available-pizza-sizes';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';


interface Props {
  imageUrl: string;
  name: string;
  ingredients: IngredientsModel[];
  items: ProductItemsModel[];
  loading?: boolean;
  onSubmit: (itemId?: number, ingredients?: number[]) => void;
  className?: string;
}

const ChoosePizzaForm: FC<Props> = ({
                                      name,
                                      items,
                                      imageUrl,
                                      ingredients,
                                      loading,
                                      onSubmit,
                                      className,
                                    }) => {


  const {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    filteredPizzasByType,
    setSelectedIngredients,
    availablePizzas,
    currentItemId,
  } = usePizzaOptions(items);


  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
  const { pizzaPrice, totalIngredientPrice } = calcPizzaPrices(items, ingredients, selectedIngredients, type, size);

  const handleClickAdd = () => {
    onSubmit?.(currentItemId, ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).map(item => item.id));
  };
  return (
    <div className={cn('flex flex-1', className)}>
      <ProductImage size={size} imageUrl={imageUrl} />
      <div className={'w-[490px] bg=[#FCFCFC] p-7'}>
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />

        <p>{textDetails}</p>

        <div className={'flex flex-col gap-5 mt-5'}>
          <GroupVariants
            items={availablePizzas}
            selectedValue={size.toString()}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            selectedValue={type.toString()}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md max-h-[420px] overflow-auto scrollbar mt-5">
          <div className={'grid grid-cols-3 gap-3'}>
            {ingredients.map((ingredient, index) => (
              <IngredientItem key={ingredient.id} name={ingredient.name} price={ingredient.price}
                              imageUrl={ingredient.imageUrl}
                              active={selectedIngredients.has(ingredient.id)}
                              onClick={() => setSelectedIngredients(ingredient.id)} />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {pizzaPrice && pizzaPrice + totalIngredientPrice} ₽
        </Button>
      </div>

    </div>
  );
};

export default ChoosePizzaForm;