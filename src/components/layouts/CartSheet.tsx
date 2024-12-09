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
import { Icons } from "../icons";
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
        <SheetHeader className="mb-2">
          <SheetTitle>Cart - {itemCount}</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <div className=""></div>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <Icons.cart className="mb-4 size-16 text-muted-foreground" />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
