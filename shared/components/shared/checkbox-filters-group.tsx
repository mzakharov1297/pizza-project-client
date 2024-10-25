"use client"

import React, {useEffect, useState} from 'react';
import {FilterChecboxProps, FilterCheckbox} from "@/shared/components/shared/filter-checkbox";
import {cn} from "@/shared/lib/utils";
import {Input, Skeleton} from "@/shared/components/ui";


type Item = FilterChecboxProps

interface Props {
    items: Item[]
    defaultItems?: Item[]
    limit?: number
    searchInputPlaceholder?: string
    onClickCheckbox?: (id: string) => void
    defaultValue?: Item[]
    title: string;
    selected: Set<string>
    className?: string;
    loading?: boolean
    name?: string
}

const CheckboxFiltersGroup: React.FC<Props> = ({
                                                   title,
                                                   items,
                                                   defaultItems,
                                                   limit = 5,
                                                   searchInputPlaceholder = "Поиск...",
                                                   className,
                                                   onClickCheckbox,
                                                   defaultValue,
                                                   loading,
                                                   selected,
                                                   name
                                               }) => {

    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState("");


    const onChangeSearchInput = (value: string) => {
        setSearchValue(value);
    }

    if (loading || items.length < 1) {
        return (
            <div className={cn("max-w-full", className)}>
                <p className={"font-bold mb-3"}>{title}</p>
                {
                    ...Array(limit).fill(0).map((_, index) => {
                        return (
                            <Skeleton key={index} className={"h-6 mb-4 rounded-[8px]"}/>
                        )
                    })
                }
                <Skeleton className={"h-6 w-[60%]"}/>
            </div>
        )
    }
    const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items)?.slice(0, limit)


    return (
        <div className={cn("", className)}>
            <p className={"font-bold mb-3"}>{title}</p>
            {showAll && <div className={"mb-5"}>
                <Input onChange={(e) => onChangeSearchInput(e.target.value)} placeholder={searchInputPlaceholder}
                       className={"bg-gray-50 border-none"}/>
            </div>}

            <div className={"flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar"}>
                {
                    list?.map((item, index) => (
                        <FilterCheckbox
                            onCheckedChange={() => onClickCheckbox?.(item.value)}
                            checked={selected.has(item.value)}
                            key={String(item.value)}
                            value={item.value}
                            text={item.text}
                            endAdornment={item.endAdornment}
                            name={name}
                        />
                    ))
                }
            </div>

            {items.length > limit && (
                <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className={"text-primary mt-3"}>{!showAll ? "+ Показать все" : "Скрыть"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckboxFiltersGroup;