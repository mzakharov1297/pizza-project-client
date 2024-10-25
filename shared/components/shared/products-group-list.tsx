"use client"

import React, {useEffect, useRef, useState} from 'react';
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/shared/store/category";
import {Title} from "@/shared/components/shared/title";
import {cn} from "@/shared/lib/utils";
import ProductCard from "@/shared/components/shared/product-card";



interface Props {
    title: string
    products: any
    categoryId: number
    listClassName?: string
    className?: string;
}

const ProductsGroupList: React.FC<Props> = ({className, products, listClassName, title, categoryId}) => {
    const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.6
    })

    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    useEffect(() => {
        if (products[0].items ) {
            setPrice(products[0].items[0].price)
        }
    }, [price]);
    return (
        <div ref={intersectionRef} className={className} id={title}>
            <Title size={"lg"} text={title} className={"font-extrabold mb-5"}/>
            <div className={cn("grid grid-cols-3 gap-5", listClassName)}>
                {
                    products.map((product: any, i: number) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={product.productItems[0].price }
                            ingredients={product.ingredients}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ProductsGroupList;