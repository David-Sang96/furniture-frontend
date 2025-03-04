import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";
import { Icons } from "../icons";
import { AspectRatio } from "../ui/aspect-ratio";

interface ProductCardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  product: Product;
}

function ProductCard({ product, className }: ProductCardProps) {
  const isDesktop = useMediaQuery({ minWidth: 1530 });

  return (
    <Card className={cn("size-full overflow-hidden rounded-lg", className)}>
      <Link to={`/products/${product.id}`} aria-label={product.name}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <img
              src={product.images[0]}
              alt=" product image"
              className="size-full object-cover"
              loading="lazy"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="space-y-1.5 p-4 px-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1 2xl:text-base">
            {formatPrice(product.price)}
            {product.discount > 0 && (
              <span className="ml-2 font-extralight line-through">
                {formatPrice(product.discount)}
              </span>
            )}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        {product.status === "active" ? (
          <Button
            size={isDesktop ? "lg" : "sm"}
            className="w-full rounded-sm font-bold"
            aria-label="Active"
          >
            <Icons.plus />
            Add to cart
          </Button>
        ) : (
          <Button
            size={isDesktop ? "lg" : "sm"}
            className="w-full rounded-sm font-bold"
            disabled={true}
            aria-label="Sold Out"
          >
            Sold out
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
