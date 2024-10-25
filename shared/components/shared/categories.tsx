"use client"
import React, {useEffect, useRef} from 'react';
import {CategoryModel} from "@/shared/models/category-model";
import {useCategoryStore} from "@/shared/store/category";
import {cn} from "@/shared/lib/utils";


interface Props {
    categories?: CategoryModel[]
    className?: string;
}


const Categories: React.FC<Props> = ({className, categories}) => {

    const ref = useRef<HTMLAnchorElement>(null);
    const activeIndex = useCategoryStore(state => state.activeId)
    const [selectBox, setSelectBox] = React.useState<{
        width: number
        offsetLeft: number
    } >({
        width: 0,
        offsetLeft: 0
    })


    useEffect(() => {
        setSelectBox({
            offsetLeft: ref.current?.offsetLeft ?? 0,
            width: ref.current?.offsetWidth ?? 0,
        })
    }, [ref, activeIndex])
    return (
        <div className={cn("relative inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
            <div style={{
                transform: `translateX(calc(${selectBox.offsetLeft}px - 4px))`,
                width: `calc(${selectBox.width}px + 4px)`
            }}
                 className={"absolute inset-y-0 left-0 bg-white rounded-2xl shadow-md shadow-gray-200 transition-all duration-300"}
            />
            {categories && categories.map((category, index) => (
                <a ref={activeIndex === category.id ? ref : undefined} href={`/#${category.name}`} key={category.id}
                   className={cn(
                       "relative  flex items-center font-bold h-11 rounded-2xl px-5 transition-colors duration-300",
                       activeIndex === category.id && "text-primary"
                   )}>
                    <button>
                        {category.name}
                    </button>
                </a>
            ))}
        </div>
    );
};

export default Categories;