'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductModel } from '@/shared/models/product-model';
import { Dialog } from '@/shared/components/ui';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import ChoosePizzaForm from '@/shared/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/shared/choose-product-form';
import { useCartStore } from '@/shared/store/cart';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import toast from 'react-hot-toast';
import ProductForm from '@/shared/components/shared/product-form';


interface Props {
  product: ProductModel;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className,
        )}
      >
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>
              Title
            </DialogTitle>
            <DialogDescription>
              Description
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <ProductForm isModal={true} product={product}/>
      </DialogContent>
    </Dialog>
  );
};