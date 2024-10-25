"use client"
import React from 'react';
import {Search} from "lucide-react";
import {useClickAway, useDebounce} from "react-use";
import Link from "next/link";
import {ProductModel} from "@/shared/models/product-model";
import {Api} from "@/shared/services/api-client";
import {cn} from "@/shared/lib/utils";
import {Input} from "@/shared/components/ui";


interface Props {
    className?: string;
}

const SearchInput: React.FC<Props> = ({className}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const ref = React.useRef(null);
    const [products, setProducts] = React.useState<ProductModel[]>([]);

    useClickAway(ref, () => {
        setFocused(false)
    })


    useDebounce(
        async () => {
            try {
                const response = await Api.products.search(searchQuery)
                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        },
        250,
        [searchQuery],
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    };
    return (
        <>
            {focused &&
                <div className={cn("fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30")}/>

            }
            <div
                ref={ref}
                className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}
            >
                <Search className="absolute top-1/2 translate-y-[-60%] left-3 h-5 text-gray-400"/>
                <Input
                    className={"rounded-2xl outline-none w-full bg-gray-100 pl-11"}
                    type={"text"}
                    placeholder={"Найти пиццу..."}
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {
                    products.length > 0 && <div
                        className={cn(
                            'absolute w-full  max-h-[50vh] bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200  invisible opacity-0 z-30', focused && 'visible opacity-100 top-12',
                        )}
                    >
                        <div className={"w-[99%] scrollbar overflow-auto max-h-[49vh] "}>
                            {products.map((product) => (
                                    <Link
                                        onClick={onClickItem}
                                        key={product.id}
                                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                                        href={`/product/${product.id}`}>
                                        <img className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name}/>
                                        <span>{product.name}</span>
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                }
            </div>
        </>

    );
};

export default SearchInput;