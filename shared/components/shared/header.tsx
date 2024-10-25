"use client"

import React from 'react';
import Image from "next/image"
import {ArrowRight, ShoppingCart, User} from "lucide-react";
import Link from "next/link";
import {cn} from "@/shared/lib/utils";
import {Container} from "@/shared/components/shared/container";
import SearchInput from "@/shared/components/shared/search-input";
import {Button} from "@/shared/components/ui";
import CartButton from "@/shared/components/shared/cart-button";
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

const Header: React.FC<Props> = ({hasSearch = true, hasCart = true,className,}) => {

    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams();

    React.useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);
    return (
        <header className={cn("border border-b", className)}>
            <Container className={"flex items-center justify-between py-8"}>
                <Link href={"/"}>
                    <div className={"flex items-center gap-4"}>
                        <Image src="/logo.png" alt="logo" width={35} height={35}/>
                        <div>
                            <h1 className={"text-2xl uppercase font-black"}>Максон-Клаксон ПИЦЦА</h1>
                            <p className={"text-sm text-center text-gray-400 leading-3"}>То, о чем ты мечтаешь, пока
                                пишешь код</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                  <div className="mx-10 flex-1">
                      <SearchInput />
                  </div>
                )}


                <div className={"flex items-center gap-3"}>
                    <Button className={"flex items-center gap-1"} variant={"outline"}>
                        <User size={16}/>
                        Войти
                    </Button>

                    {hasCart && <div>
                        <CartButton />
                    </div>}
                </div>
            </Container>
        </header>
    );
};

export default Header;