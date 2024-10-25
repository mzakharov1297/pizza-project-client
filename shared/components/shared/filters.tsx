"use client"

import React from 'react';

import {useIngredients} from "@/shared/hooks/use-ingredients";
import {useFilters} from "@/shared/hooks/use-filters";
import {useQueryFilters} from "@/shared/hooks/use-query-filters";
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import CheckboxFiltersGroup from "@/shared/components/shared/checkbox-filters-group";
import {Input} from "@/shared/components/ui";
import {RangeSlider} from "@/shared/components/shared/range-slider";

interface Props {
    className?: string;
}



const Filters: React.FC<Props> = ({className}) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));


    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    };



    return (
        <div className={cn("w-[250px]", className)}>
            <Title text={"Фильтрация"} size={"md"} className={"mb-5 font-bold"}/>

            {/*Верхние чекбоксы*/}

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
            />
            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={filters.setSizes}
                selected={filters.sizes}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
            />

            {/*Рендж цены*/}
            <div className={"mt-5 border-y border-y-neutral-100 py-6 pb-7"}>
                <p className={"font-bold mb-3"}>Цена от и до:</p>
                <div className={"flex gap-3 mb-5"}>
                    <Input type={"number"} placeholder={"0"} min={0} max={5000}
                           onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                           value={String(filters.prices.priceFrom)}
                    />
                    <Input type={"number"} min={100} max={5000} placeholder={"30000"}
                           onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                           value={String(filters.prices.priceTo)}
                    />
                </div>
                <RangeSlider min={0} max={1000}  value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} step={10}  onValueChange={updatePrices}/>
            </div>


            <CheckboxFiltersGroup
                title="Ингредиенты"
                name="ingredients"
                className="mt-5"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />

        </div>
    );
};

export default Filters;