import React from 'react';
import {CategoryModel} from "@/shared/models/category-model";
import {cn} from "@/shared/lib/utils";
import {Container} from "@/shared/components/shared/container";
import Categories from "@/shared/components/shared/categories";
import SortPopup from "@/shared/components/shared/sort-popup";


interface Props {
    categories?: CategoryModel[]
    className?: string;
}

const TopBar:React.FC<Props> = ({className, categories}) => {
    return (
        <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
            <Container className={"flex items-center justify-between"}>
                <Categories categories={categories}/>
                <SortPopup/>
            </Container>

        </div>
    );
};

export default TopBar;