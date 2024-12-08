/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Button, ButtonProps } from "../ui/button";

interface AddToFavoriteProps extends ButtonProps {
  productId: string;
  rating: number;
}

function AddToFavorite({
  productId,
  rating,
  className,
  ...props
}: AddToFavoriteProps) {
  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      className={cn("size-8", className)}
      {...props}
    >
      <Icons.heart className="size-4" />
    </Button>
  );
}

export default AddToFavorite;
