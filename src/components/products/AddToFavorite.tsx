/* eslint-disable @typescript-eslint/no-unused-vars */
import { useIsFetching, useMutation } from "@tanstack/react-query";

import api from "@/api";
import { queryClient } from "@/api/query";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Icons } from "../icons";
import { Button, ButtonProps } from "../ui/button";

interface AddToFavoriteProps extends ButtonProps {
  productId: string;
  rating: number;
  isFavorite: boolean;
}

function AddToFavorite({
  productId,
  rating,
  isFavorite,
  className,
  ...props
}: AddToFavoriteProps) {
  const fetching = useIsFetching() > 0;
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.patch("users/products/toggle-favorite", {
        productId,
        favorite: !isFavorite,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      // invalidateQuerires invoke the queryFn to fetch the api again behind the scence
      await queryClient.invalidateQueries({
        queryKey: ["products", "detail", productId],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data || "Something went wrong.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong.");
      }
    },
    // This will always run, whether the mutation succeeds or fails
    onSettled: () => {},
  });
  let favorite = isFavorite;

  if (isPending || fetching) {
    favorite = !isFavorite;
  }

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      className={cn("size-8", className)}
      title={favorite ? "Remove from favorite" : "Add to favorite"}
      {...props}
      onClick={() => mutate()}
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
  );
}

export default AddToFavorite;
