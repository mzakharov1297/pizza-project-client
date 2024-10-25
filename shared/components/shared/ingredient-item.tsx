import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {CircleCheck} from "lucide-react";

interface Props {
    className?: string;
    imageUrl?: string;
    name: string
    price: number
    active?: boolean
    onClick?: () => void

}

const IngredientItem: FC<Props> = ({
                                       className,
                                       name,
                                       imageUrl,
                                       active,
                                       price,
                                       onClick
                                   }) => {
    return (
        <div onClick={onClick}
             style={{
                 border: "1px solid",
                 borderColor: active? "hsl(var(--primary))" : "transparent",
             }}
             className={cn(
                 'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
                 {'border border-primary': active},
                 className,
             )}
        >
            {active && <CircleCheck className="absolute top-2 right-2 text-primary"/>}
            <img width={110} height={110} src={imageUrl}/>
            <span className="text-xs mb-1">{name}</span>
            <span className="font-bold">{price} ₽</span>
        </div>
    );
};

export default IngredientItem;