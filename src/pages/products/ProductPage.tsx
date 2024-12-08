import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import { filterList, products } from "@/data/products";
import { PaginationBottom } from "../../components/products/Pagination";

const ProductPage = () => {
  return (
    <section className="my-8 flex flex-col lg:flex-row">
      <section className="mb-8 lg:w-1/5">
        <ProductFilter filterList={filterList} />
      </section>
      <section className="lg:flex-1">
        <h1 className="mb-8 text-2xl font-bold">All Products</h1>
        <div className="mb-12 grid gap-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <PaginationBottom />
      </section>
    </section>
  );
};

export default ProductPage;
