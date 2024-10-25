import React from 'react';
import Link from "next/link";

import {Plus} from "lucide-react";
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";

interface Props {
    id: number
    name: string
    price: number
    imageUrl: string
    ingredients: any
    className?: string;
}

const ProductCard: React.FC<Props> = ({className, name, price, imageUrl, id, ingredients}) => {
    return (
        <div className={cn("", className)}>
            <Link href={`/product/${id}`} scroll={false}>
                <div className={"flex justify-center p-6 bg-secondary rounded-lg h-[260px]"}>
                    <img className={"w-[215px] h-[215px]"} src={imageUrl} alt={name}/>
                </div>

                <Title size={"sm"} text={name} className={"mb-1 mt-3 font-bold"}/>

                <p className={"text-sm text-gray-400"}>
                    {ingredients.map((ingredient: any) => ingredient.name).join(", ")}
                </p>

                <div className={"flex justify-between items-center mt-4"}>
                    <span className={"text-[20px]"}>
                        От <b>{price} ₽</b>
                    </span>

                    <Button variant={"secondary"} className={"text-base font-bold"}>
                        <Plus size={20} className={"mr-1"}/>
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;