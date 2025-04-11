import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router";
import CartItem from "../carts/CartItem";
import { Icons } from "../icons";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function CartSheet() {
  const itemCount = useCartStore((store) => store.getTotalItems());
  const totalAmount = useCartStore((store) => store.getTotalPrices());
  const carts = useCartStore((store) => store.carts);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="relative"
          aria-label="open cart"
        >
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5"
            >
              {carts.length}
            </Badge>
          )}
          <Icons.cart
            className="size-4"
            aria-hidden="true"
            aria-label="cart icon"
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {itemCount > 0 ? `Cart - ${itemCount}` : "Empty Cart"}
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-2" />
        {carts.length > 0 ? (
          <>
            <ScrollArea className="my-4 h-[68vh] pb-8">
              {carts.map((cart) => (
                <CartItem key={cart.id} cart={cart} />
              ))}
            </ScrollArea>
            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculate</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>
                    {formatPrice(totalAmount.toFixed(2), {
                      notation: "standard",
                    })}
                  </span>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" asChild className="w-full">
                    <Link to={"/checkout"} aria-label="check out">
                      Continue to checkout
                    </Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <Icons.cart className="mb-4 size-16 text-muted-foreground" />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
