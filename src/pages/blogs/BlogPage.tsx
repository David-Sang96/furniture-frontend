import { postInfiniteQuery } from "@/api/query";
import BlogPostList from "@/components/blogs/BlogPostList";
import BlogPageSkeleton from "@/components/skeletons/BlogPageSkeleton";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
// import { posts } from "@/data/posts";

const BlogPage = () => {
  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    // isFetchingPreviousPage,
    // fetchPreviousPage,
    // hasPreviousPage,
  } = useInfiniteQuery(postInfiniteQuery());

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return status === "pending" ? (
    <BlogPageSkeleton />
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <section>
      <h1 className="mt-8 text-2xl font-bold max-md:text-center">
        Latest Blog Posts
      </h1>
      <BlogPostList posts={allPosts} />
      <div className="my-4 flex justify-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          variant={!hasNextPage ? "ghost" : "secondary"}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
      </div>
      <div className="">
        {isFetching && !isFetchingNextPage ? "Fetching..." : null}
      </div>
    </section>
  );
};

export default BlogPage;
