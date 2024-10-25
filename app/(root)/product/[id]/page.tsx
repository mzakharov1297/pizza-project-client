import React from 'react';
import NotFound from 'next/dist/client/components/not-found-error';
import { Api } from '@/shared/services/api-client';
import { Container } from '@/shared/components/shared/container';
import ChoosePizzaForm from '@/shared/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/shared/choose-product-form';
import toast from 'react-hot-toast';
import { useCartStore } from '@/shared/store/cart';
import ProductForm from '@/shared/components/shared/product-form';

const ProductPage = async ({params: {id}}: { params: { id: string } }) => {



    const data = async () => {
        try {
            const data = await Api.products.getProductById(id)
            return data
        } catch (e: any) {
            console.error(e.response.data.message);
        }
    }

    const product = await data()
    if (!product) {
        return NotFound();
    }





    return (
        <Container className={"flex flex-col my-10"}>
            <ProductForm product={product}/>
        </Container>
    );
};

export default ProductPage;