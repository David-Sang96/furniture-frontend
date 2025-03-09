import { Skeleton } from "@/components/ui/skeleton";

const HomePageSkeleton = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="flex flex-col gap-5 max-md:text-center lg:flex-row lg:justify-between">
        <div className="my-8 lg:my-0 lg:mt-16 lg:w-2/5 2xl:mt-24">
          <Skeleton className="mb-4 h-10 w-3/4 lg:mb-8 lg:h-14 lg:w-2/3 2xl:h-16" />
          <Skeleton className="mb-6 h-4 w-full lg:mb-8 lg:h-5 2xl:h-6" />
          <Skeleton className="mb-6 h-4 w-5/6 lg:mb-8 lg:h-5 2xl:h-6" />
          <div className="flex space-x-2">
            <Skeleton className="h-12 w-32 rounded-full max-sm:h-10 max-sm:w-24" />
            <Skeleton className="h-12 w-32 rounded-full max-sm:h-10 max-sm:w-24" />
          </div>
        </div>
        <Skeleton className="my-8 h-64 w-full lg:mt-16 lg:w-3/5 2xl:mt-24" />
      </div>

      {/* Carousel */}
      <div className="overflow-hidden py-8 lg:px-10">
        <Skeleton className="h-40 w-full" />
      </div>

      {/* Featured Products Section */}
      <Skeleton className="mx-auto my-6 h-8 w-1/3 py-6" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>

      {/* Blog Section */}
      <Skeleton className="mx-auto my-6 h-8 w-1/3 py-6" />
      <div className="my-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    </section>
  );
};

export default HomePageSkeleton;
