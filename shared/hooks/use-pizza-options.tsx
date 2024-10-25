'use client';

import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import { PizzaSize, PizzaType } from '@/shared/consts/pizza';
import { ProductItemsModel } from '@/shared/models/product-items';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '@/shared/lib/get-available-pizza-sizes';
import { Variant } from '@/shared/components/shared/group-variants';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: Dispatch<SetStateAction<PizzaSize>>
  setType: Dispatch<SetStateAction<PizzaType>>
  selectedIngredients: Set<number>
  setSelectedIngredients: (key: number) => void,
  currentItemId?: number
  availablePizzas: Variant[];
  filteredPizzasByType: ProductItemsModel[]
}

export const usePizzaOptions = (items: ProductItemsModel[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(new Set<number>([]));
  const { availablePizzas, filteredPizzasByType } = getAvailablePizzaSizes(items, type);

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  useLayoutEffect(() => {
    if (!filteredPizzasByType.some(pizza => pizza.size === size)) {
      setSize(filteredPizzasByType[0].size as PizzaSize);
    }
  }, [size, type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    setSelectedIngredients,
    availablePizzas,
    filteredPizzasByType,
    currentItemId
  };
};