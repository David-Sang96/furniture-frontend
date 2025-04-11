import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";
import { Icons } from "../icons";

interface AddToCartFormProps {
  isAvailable: boolean;
  product: Product;
}

const quantitySchema = z.object({
  quantity: z
    .string()
    .min(1, "Must not be emprty")
    .max(4, "Too Many!Is it real?")
    .regex(/^\d+$/, "Must be a number"),
});

export function AddToCartForm({ isAvailable, product }: AddToCartFormProps) {
  const onUpdate = useCartStore((store) => store.updateItem);
  const onAdd = useCartStore((store) => store.addItem);
  const cartItem = useCartStore((store) =>
    store.carts.find((cart) => cart.id === product.id),
  );

  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: cartItem ? cartItem.quantity.toString() : "1",
    },
  });

  const { setValue, watch } = form;
  //dirtyFields only updates when the user types into the input — and not when changing the value programmatically using setValue.
  const { dirtyFields } = useFormState({ control: form.control });
  const currentQuantity = Number(watch("quantity"));

  // React Hook Form tracks “dirty” (changed) fields only when:
  // User types
  // Or you manually tell it with shouldDirty: true
  const handleIncrease = () => {
    const newQuantity = Math.min(currentQuantity + 1, 9999);
    setValue("quantity", newQuantity.toString(), {
      shouldValidate: true,
      shouldDirty: true,
    });
    onUpdate(product.id, newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(currentQuantity - 1, 0);
    setValue("quantity", newQuantity.toString(), {
      shouldValidate: true,
      shouldDirty: true,
    });
    onUpdate(product.id, newQuantity);
  };

  const handleAdd = () => {
    // if (cart && cart.quantity === 1) return;

    if (dirtyFields.quantity || currentQuantity === 1) {
      onAdd({
        id: product.id,
        image: product.images[0].path,
        name: product.name,
        price: product.price,
        quantity: currentQuantity,
      });
      toast.success(
        `${cartItem ? "Updated Cart Successfully" : "Product is added to cart successfully"}`,
      );
    }
  };

  useEffect(() => {
    if (cartItem) {
      setValue("quantity", cartItem.quantity.toString(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [cartItem, setValue]);

  // const onSubmit = (values: z.infer<typeof quantitySchema>) => {
  //   console.log(values);
  //   toast.success("Product is added to cart successfully.");
  //   call api
  // };

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-[260px] flex-col gap-4"
      >
        <div className="flex items-center">
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            className="size-8 shrink-0 rounded-r-none"
            onClick={handleDecrease}
            disabled={currentQuantity <= 1}
          >
            <Icons.minus aria-hidden="true" className="size-3" />
            <span className="sr-only">Remove item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-8 w-14 rounded-none text-center [appearance:textfield] focus-visible:outline-none focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={9999}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            className="size-8 shrink-0 rounded-l-none"
            onClick={handleIncrease}
            disabled={currentQuantity >= 9999}
          >
            <Icons.plus aria-hidden="true" className="size-3" />
            <span className="sr-only">Add item</span>
          </Button>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            aria-label="Buy now"
            size={"sm"}
            className={cn(
              "w-full bg-own font-bold hover:bg-own/80 dark:text-white",
            )}
            disabled={!isAvailable}
          >
            Buy Now
          </Button>
          <Button
            type="button"
            aria-label="Add To Cart"
            variant={isAvailable ? "outline" : "default"}
            size={"sm"}
            className="w-full font-semibold"
            onClick={handleAdd}
            disabled={!isAvailable}
          >
            {cartItem ? "Update Cart" : " Add To Cart"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
