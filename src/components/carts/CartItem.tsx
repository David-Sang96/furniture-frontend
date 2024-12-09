import { Cart } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Editable from "./Editable";

interface CartItemProps {
  cart: Cart;
}

function CartItem({ cart }: CartItemProps) {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex gap-4">
        <img
          src={cart.image.url}
          alt="cart picture"
          className="w-16 object-cover"
        />
        <div className="">
          <span className="line-clamp-1 text-sm font-medium">{cart.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(cart.price)} x {cart.quantity} ={" "}
            {formatPrice((Number(cart.price) * cart.quantity).toFixed(2))}
          </span>
          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
            {`${cart.category} / ${cart.subcategory}`}
          </span>
        </div>
      </div>
      <Editable />
      <Separator />
    </div>
  );
}

export default CartItem;
