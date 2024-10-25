"use client";

import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {Button} from "@/shared/components/ui";
import {ArrowRight, ShoppingCart} from "lucide-react";
import CartDrawer from "@/shared/components/shared/cart-drawer";
import { useCartStore } from '@/shared/store/cart';

interface Props {
    className?: string;
}

const CartButton:FC<Props> = ({className}) => {
    const [totalAmount, items, loading] = useCartStore(state => [state.totalAmount, state.items, state.loading])
    return (
        <CartDrawer>
            <Button loading={loading} className={cn("group relative",{'w-[105px]': loading} ,className)}>
                <b>{totalAmount} ₽</b>
                <span className={"h-full w-[1px] bg-white/30 mx-3"}/>
                <div className={"flex items-center gap-1 transition duration-300 group-hover:opacity-0"}>
                    <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                    <b>{items.length}</b>
                </div>
                <ArrowRight
                    size={20}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>

    );
};

export default CartButton;