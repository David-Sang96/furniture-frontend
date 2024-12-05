import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category } from "@/types";

interface ProductFilterProps {
  filterList: { categories: Category[]; types: Category[] };
}

const FilterSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one category.",
    }),
  types: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one type.",
  }),
});

export default function ProductFilter({ filterList }: ProductFilterProps) {
  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      categories: [],
      types: [],
    },
  });

  function onSubmit(data: z.infer<typeof FilterSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8 flex max-md:gap-5 lg:flex-col-reverse lg:gap-8">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="types"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Furniture Types</FormLabel>
                  </div>
                  {filterList.types.map((type) => (
                    <FormField
                      key={type.id}
                      control={form.control}
                      name="types"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={type.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(type.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, type.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== type.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {type.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage className="max-md:text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Furniture Made By
                    </FormLabel>
                  </div>
                  {filterList.categories.map((category) => (
                    <FormField
                      key={category.id}
                      control={form.control}
                      name="categories"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={category.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        category.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== category.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {category.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage className="max-md:text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant={"outline"}
          className="w-2/6 md:w-1/6 lg:w-1/3"
        >
          Filter
        </Button>
      </form>
    </Form>
  );
}
