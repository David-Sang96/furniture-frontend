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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Icons } from "../icons";

interface AddToCartFormProps {
  isAvailable: boolean;
}

const quantitySchema = z.object({
  quantity: z.number().min(0).default(1),
});

export function AddToCartForm({ isAvailable }: AddToCartFormProps) {
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof quantitySchema>) => {
    console.log(values);
    toast.success("Product is added to cart successfully.");
    // call api
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-[260px] flex-col gap-4"
      >
        <div className="flex items-center">
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            className="size-8 shrink-0 rounded-r-none"
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
                    className="h-8 w-16 rounded-none border-x-0"
                    type="number"
                    inputMode="numeric"
                    min={0}
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
            className={cn("w-full font-bold")}
            disabled={!isAvailable}
          >
            Buy Now
          </Button>
          <Button
            type="submit"
            aria-label="Add To Cart"
            variant={isAvailable ? "outline" : "default"}
            size={"sm"}
            className="w-full font-semibold"
          >
            Add To Cart
          </Button>
        </div>
      </form>
    </Form>
  );
}
