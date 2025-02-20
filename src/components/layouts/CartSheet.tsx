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
import { cartItems } from "@/data/carts";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router";
import CartItem from "../carts/CartItem";
import { Icons } from "../icons";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function CartSheet() {
  const itemCount = 4;
  const totalAmount = 190;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="relative"
          aria-label="open cart"
        >
          <Badge
            variant="destructive"
            className="absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5"
          >
            {itemCount}
          </Badge>
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-lg">
        <SheetHeader>
          <SheetTitle>Cart - {itemCount}</SheetTitle>
        </SheetHeader>
        <Separator className="my-2" />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="my-4 h-[68vh] pb-8">
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} cart={cartItem} />
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
                  <span>{formatPrice(totalAmount.toFixed(2))}</span>
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
            <Icons.cart className="text-muted-foreground mb-4 size-16" />
            <div className="text-muted-foreground text-xl font-medium">
              Your cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
