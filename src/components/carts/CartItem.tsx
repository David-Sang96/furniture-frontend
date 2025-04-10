import { formatPrice } from "@/lib/utils";
import { CartType, useCartStore } from "@/store/cartStore";
import { Separator } from "../ui/separator";
import Editable from "./Editable";

interface CartItemProps {
  cart: CartType;
}

const imageUrl = import.meta.env.VITE_IMG_URL;

function CartItem({ cart }: CartItemProps) {
  const updateItem = useCartStore((store) => store.updateItem);
  const removeItem = useCartStore((store) => store.removeItem);

  const updateHandler = (quantity: number) => updateItem(cart.id, quantity);
  const removeHandler = () => removeItem(cart.id);

  return (
    <div className="mt-4 space-y-3">
      <div className="flex gap-4">
        <img
          src={imageUrl + cart.image}
          alt="cart picture"
          className="w-16 object-cover"
          loading="lazy"
          decoding="async"
        />
        <div>
          <span className="line-clamp-1 text-sm font-medium">{cart.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(cart.price)} x {cart.quantity} ={" "}
            {formatPrice((cart.price * cart.quantity).toFixed(2))}
          </span>
          {/* <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
            {`${cart.category} / ${cart.subcategory}`}
          </span> */}
        </div>
      </div>
      <Editable
        onUpdate={updateHandler}
        onDelete={removeHandler}
        quantity={cart.quantity}
      />
      <Separator />
    </div>
  );
}

export default CartItem;
