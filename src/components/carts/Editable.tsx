import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { Icons } from "../icons";

const quantitySchema = z.object({
  quantity: z
    .string()
    .min(1, "Must not be emprty")
    .max(4, "Too Many!Is it real?")
    .regex(/^\d+$/, "Must be a number"),
});

interface EditableProps {
  quantity: number;
  onUpdate: (value: number) => void;
  onDelete: () => void;
}

export default function Editable({
  onUpdate,
  onDelete,
  quantity,
}: EditableProps) {
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: quantity.toString(),
    },
  });

  const { setValue, watch } = form;
  //to check if input value changes or stays the same
  //Observes and returns the current value (whether it changed or not)
  const currentQuantity = Number(watch("quantity"));

  // const onSubmit = (values: z.infer<typeof quantitySchema>) => {
  //   console.log(values);
  //   toast.success("Product is added to cart successfully.");
  // };

  const handleDecrease = () => {
    if (currentQuantity === 1) toast.error("Product is removed from cart");
    // Returns the larger value of quanity or 0
    //If quanity is greater than 0, it will return quanity. If quanity is less than 0, it will return 0.
    const newQuantity = Math.max(currentQuantity - 1, 0);
    //Sets a value into the input
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    onUpdate(newQuantity);
  };

  const handleIncrease = () => {
    // Returns the smaller value of quantity or 9999
    //If quanity is less than 9999, it will return quantity. If qantity is greater than 9999, it will return 9999.
    const newQuantity = Math.min(currentQuantity + 1, 9999);
    //Sets a value into the input
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    onUpdate(newQuantity);
  };

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between"
      >
        <div className="flex items-center">
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            className="size-8 shrink-0 rounded-r-none"
            onClick={handleDecrease}
            disabled={currentQuantity === 0}
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
                    type="number"
                    inputMode="numeric"
                    min={1}
                    className="h-8 w-14 rounded-none text-center [appearance:textfield] focus-visible:outline-none focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
            disabled={currentQuantity > 9999}
          >
            <Icons.plus aria-hidden="true" className="size-3" />
            <span className="sr-only">Add item</span>
          </Button>
        </div>
        <Button
          type="button"
          aria-label="Buy now"
          variant={"outline"}
          size={"icon"}
          className={"size-8"}
          onClick={onDelete}
        >
          <Icons.trash className="size-3" aria-hidden="true" />
          <span className="sr-only">delete item</span>
        </Button>
      </form>
    </Form>
  );
}
