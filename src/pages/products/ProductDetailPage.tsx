import BackButton from "@/components/BackButton";
import { Icons } from "@/components/icons";
import ProductCard from "@/components/products/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Autoplay from "embla-carousel-autoplay";
import { useLoaderData } from "react-router";

import { oneProductQuery, productsQuery } from "@/api/query";
import { AddToCartForm } from "@/components/products/AddToCartForm";
import AddToFavorite from "@/components/products/AddToFavorite";
import Rating from "@/components/products/Rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const ProductDetailPage = () => {
  const { productId } = useLoaderData();
  const { data: productDetail } = useSuspenseQuery(oneProductQuery(productId));
  const { data: productsData } = useSuspenseQuery(productsQuery("?limit=4"));

  const product = productDetail.product as Product;
  const products = productsData.products as Product[];
  const imgUrl = import.meta.env.VITE_IMG_URL;

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div>
      <BackButton>
        <div>
          <Icons.arrowLeft /> All Products
        </div>
      </BackButton>
      {/* Top Right Section */}
      <section className="mb-8 flex flex-col gap-8 md:flex-row lg:gap-16 lg:p-3">
        <Carousel plugins={[plugin.current]} className="flex-1">
          <CarouselContent>
            {product.images.map((image) => (
              <CarouselItem key={image.id}>
                <AspectRatio ratio={1 / 1} className="bg-muted p-1">
                  <img
                    src={imgUrl + image.path}
                    alt={product.name}
                    className="size-full rounded-md object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Separator className="mt-4 md:hidden" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="space-y-0.5">
            <h2 className="line-clamp-1 text-xl font-bold lg:text-2xl">
              {product?.name}
            </h2>
            <p className="text-muted-foreground">
              {formatPrice(Number(product?.price))}
            </p>
          </div>
          <Separator className="my-1.5" />
          <p className="text-muted-foreground">{product?.inventory} in stock</p>
          <div className="flex items-center justify-between">
            <Rating rating={Number(product?.rating)} />
            <AddToFavorite
              productId={String(product?.id)}
              rating={Number(product?.rating)}
              isFavorite={!!product.users?.length}
            />
          </div>
          <AddToCartForm isAvailable={product?.status === "ACTIVE"} />
          <Separator className="my-5" />
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product?.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="mb-6 space-y-6 overflow-hidden xl:mb-10">
        <h2 className="line-clamp-1 text-lg font-semibold lg:text-2xl">
          More Products from Furniture Shop
        </h2>
        <ScrollArea className="pb-">
          <div className="flex gap-4">
            {products?.length > 0 &&
              products.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  className="min-w-[260px]"
                />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
};

export default ProductDetailPage;
