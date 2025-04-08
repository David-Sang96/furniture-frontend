import {
  categoryAndTypeQuery,
  productInfiniteQuery,
  queryClient,
} from "@/api/query";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/store/filterStore";

import validateQueryString from "@/utils/validateQueryString";

import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

const ProductPage = () => {
  const setCategory = useFilterStore((store) => store.setCategory);
  const setType = useFilterStore((store) => store.setType);
  const prevCategory = useFilterStore((store) => store.category);
  const prevType = useFilterStore((store) => store.type);
  const clearType = useFilterStore((store) => store.clearType);
  const clearCat = useFilterStore((store) => store.clearCategory);
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get("category");
  const rawType = searchParams.get("type");

  const selectedCategory =
    prevCategory.length > 0 ? prevCategory : validateQueryString(rawCategory);
  const selectedtype =
    prevType.length > 0 ? prevType : validateQueryString(rawType);

  const catParam =
    selectedCategory.length > 0 ? selectedCategory.join(",") : null;
  const typeParam = selectedtype.length > 0 ? selectedtype.join(",") : null;

  const { data: catAndType } = useSuspenseQuery(categoryAndTypeQuery());
  // prettier-ignore
  const {data,status,error,isFetching,isFetchingNextPage,fetchNextPage,hasNextPage ,refetch}
   = useInfiniteQuery(productInfiniteQuery(catParam,typeParam));

  const products = data?.pages.flatMap((item) => item.products) ?? [];

  const filterChangeHandler = (categories: string[], types: string[]) => {
    const newParams = new URLSearchParams();
    if (types.length > 0) {
      newParams.set("type", encodeURIComponent(types.join(",")));
      setType(types);
    } else clearType();

    if (categories.length > 0) {
      newParams.set("category", encodeURIComponent(categories.join(",")));
      setCategory(categories);
    } else clearCat();

    // update query string and trigger refetch api
    setSearchParams(newParams);
    // cancel in-flight queries
    queryClient.cancelQueries({ queryKey: ["products", "infinite"] });
    // clear cache
    queryClient.removeQueries({ queryKey: ["products", "infinite"] });
    refetch();
  };

  return status === "pending" ? (
    <p>Loading....</p>
  ) : status === "error" ? (
    <p>Error : {error.message}</p>
  ) : (
    <section className="my-8 flex flex-col lg:flex-row">
      <section className="mb-8 lg:w-1/5">
        <ProductFilter
          categories={catAndType.categories}
          types={catAndType.types}
          selectedCat={selectedCategory}
          selectedType={selectedtype}
          filterFn={filterChangeHandler}
        />
      </section>
      <section className="lg:flex-1">
        <h1 className="mb-8 text-2xl font-bold">All Products</h1>
        <div className="mb-12 grid gap-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="my-4 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            variant={!hasNextPage ? "ghost" : "secondary"}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
          </Button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </section>
    </section>
  );
};

export default ProductPage;
