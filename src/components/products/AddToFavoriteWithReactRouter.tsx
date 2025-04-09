/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { useFetcher } from "react-router";
import { Icons } from "../icons";
import { Button, ButtonProps } from "../ui/button";

interface AddToFavoriteProps extends ButtonProps {
  productId: string;
  rating: number;
  isFavorite: boolean;
}

function AddToFavoriteWithReactRouter({
  productId,
  rating,
  isFavorite,
  className,
  ...props
}: AddToFavoriteProps) {
  const fetcher = useFetcher({ key: `product:${productId}` });
  let favorite = isFavorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="POST">
      <Button
        variant={"secondary"}
        size={"icon"}
        className={cn("size-8", className)}
        name="favorite"
        value={favorite ? "false" : "true"}
        title={favorite ? "Remove from favorite" : "Add to favorite"}
        {...props}
      >
        {favorite ? (
          <Icons.heartFill
            className="text-red-500"
            style={{ width: 19, height: 19 }}
          />
        ) : (
          <Icons.heart style={{ width: 19, height: 19 }} />
        )}
      </Button>
    </fetcher.Form>
  );
}

export default AddToFavoriteWithReactRouter;
