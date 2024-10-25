import React from 'react';
import NotFound from "next/dist/client/components/not-found-error";
import {ChooseProductModal} from "@/shared/components/shared/modals/choose-product-modal";
import {Api} from "@/shared/services/api-client";

const ProductModalPage = async ({params: {id}}: { params: { id: string } }) => {
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
        <ChooseProductModal product={product}/>
    );
};

export default ProductModalPage;