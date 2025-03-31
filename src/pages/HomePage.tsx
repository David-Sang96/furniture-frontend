import { postQuery, productQuery } from "@/api/query";
import BlogCard from "@/components/blogs/BlogCard";
import CarouselCard from "@/components/products/CarouselCard";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import CouchImg from "@/data/images/couch.png";
import { Product } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const HomePage = () => {
  // const { productsData, postsData } = useLoaderData();
  // const {
  //   data: productsData,
  //   isLoading: isLoadingProduct,
  //   isError: isErrorProduct,
  //   error: productError,
  //   refetch: productRefetch,
  // } = useQuery(productQuery("?limit=8"));
  // const {
  //   data: postsData,
  //   isLoading: isLoadingPost,
  //   isError: isErrorPost,
  //   error: postError,
  //   refetch: postRefetch,
  // } = useQuery(postQuery("?limit=3"));

  // if (isLoadingProduct || isLoadingPost) {
  //   return <HomePageSkeleton />;
  // }

  // if (isErrorProduct || isErrorPost) {
  //   return (
  //     <div className="container mx-auto my-32 flex flex-1 place-content-center">
  //       <div className="text-center text-red-400">
  //         <p className="mb-4">{productError?.message || postError?.message}</p>
  //         <Button
  //           onClick={() => {
  //             productRefetch();
  //             postRefetch();
  //           }}
  //           variant={"secondary"}
  //         >
  //           Retry
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  const { data: productsData } = useSuspenseQuery(productQuery("?limit=8"));
  const { data: postsData } = useSuspenseQuery(postQuery("?limit=3"));

  const Title = ({
    title,
    href,
    sideText,
  }: {
    title: string;
    href: string;
    sideText: string;
  }) => (
    <div className="mb-10 mt-28 flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 className="mb-4 text-2xl font-semibold md:mb-0">{title}</h2>
      <Link to={href} className="font-semibold text-muted-foreground underline">
        {sideText}
      </Link>
    </div>
  );

  return (
    <section>
      <div className="flex flex-col max-md:text-center lg:flex-row lg:justify-between">
        {/* Text Section */}
        <div className="my-8 lg:my-0 lg:mt-16 lg:w-2/5 2xl:mt-24">
          <h1 className="mb-4 text-4xl font-bold text-own lg:mb-8 lg:text-6xl 2xl:text-7xl">
            Modern Interior Design Studio
          </h1>
          <p className="mb-6 text-own lg:mb-8 2xl:text-lg">
            Furniture is an essential component of any living space, providing
            functionality comfort, and aesthetic appeal.
          </p>
          <div className="space-x-2">
            <Button
              className="rounded-full bg-orange-300 px-8 py-6 text-base font-bold max-sm:px-6 max-sm:py-4 max-sm:text-sm"
              asChild
            >
              <Link to={"#"}>Shop Now</Link>
            </Button>
            <Button
              variant={"outline"}
              className="rounded-full px-8 py-6 text-base font-bold text-own max-sm:px-6 max-sm:py-4 max-sm:text-sm"
              asChild
            >
              <Link to={"#"}>Explore</Link>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <img
          src={CouchImg}
          alt="Couch"
          className="w-full lg:w-3/5"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="overflow-hidden lg:px-10">
        {productsData && <CarouselCard products={productsData.products} />}
      </div>
      <Title
        title="Featured Products"
        href="/products"
        sideText="View All Products"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {productsData &&
          productsData.products
            .slice(0, 4)
            .map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
      {postsData && <BlogCard posts={postsData.posts} />}
    </section>
  );
};

export default HomePage;
