import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Icons.star
          key={index}
          className={cn(
            "size-4",
            rating >= index + 1 ? "text-yellow-500" : "text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}

export default Rating;
