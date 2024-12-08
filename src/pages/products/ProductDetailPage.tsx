import BackButton from "@/components/BackButton";
import { Icons } from "@/components/icons";
import ProductCard from "@/components/products/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { products } from "@/data/products";
import Autoplay from "embla-carousel-autoplay";
import { Link, useParams } from "react-router-dom";

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
import React from "react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div>
      <BackButton>
        <Link to={"/products"}>
          <Icons.arrowLeft /> All Products
        </Link>
      </BackButton>
      {/* Top Right Section */}
      <section className="mb-8 flex flex-col gap-8 md:flex-row lg:gap-16 lg:p-3">
        <Carousel plugins={[plugin.current]} className="flex-1">
          <CarouselContent>
            {product?.images.map((image, index) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={1 / 1} className="bg-muted p-1">
                  <img
                    src={image}
                    alt={product.name}
                    className="size-full rounded-md object-cover"
                    loading="lazy"
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
            />
          </div>
          <AddToCartForm isAvailable={product?.status === "active"} />
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
            {products.slice(0, 4).map((product) => (
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
