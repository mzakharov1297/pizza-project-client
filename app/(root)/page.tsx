import { Api } from '@/shared/services/api-client';
import { Container } from '@/shared/components/shared/container';
import { Title } from '@/shared/components/shared/title';
import TopBar from '@/shared/components/shared/top-bar';
import Filters from '@/shared/components/shared/filters';
import ProductsGroupList from '@/shared/components/shared/products-group-list';
import { CategoriesSearchParams, findPizzas } from '@/shared/lib/find-pizzas';


export default async function Home({ searchParams }: {
  searchParams: CategoriesSearchParams
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className={'mt-10'}>
        <Title size={'lg'} className={'font-extrabold'} text={'Все пиццы'} />
      </Container>
      <TopBar categories={categories?.filter(category => category.products.length !== 0)} />
      <Container className={'pb-14 mt-10'}>
        <div className={'flex gap-[80px]'}>
          {/*Фильтрация*/}
          <Filters />
          {/*Список товаров*/}
          <div className={'flex-1'}>
            <div className={'flex flex-col gap-16'}>
              {
                categories?.map((item, index) => (
                  <ProductsGroupList
                    title={item.name}
                    categoryId={item.id}
                    products={item.products}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
