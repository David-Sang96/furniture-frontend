import { Skeleton } from "../ui/skeleton";

const BlogPageSkeleton = () => {
  return (
    <>
      <Skeleton className="my-6 h-8 w-1/3 py-6" />
      <div className="my-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-2xl" />
        ))}
      </div>
    </>
  );
};

export default BlogPageSkeleton;
