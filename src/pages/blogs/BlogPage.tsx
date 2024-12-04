import BlogPostList from "@/components/blogs/BlogPostList";
import { posts } from "@/data/posts";

const BlogPage = () => {
  return (
    <section>
      <h1 className="mt-8 text-2xl font-bold max-md:text-center">
        Latest Blog Posts
      </h1>
      <BlogPostList posts={posts} />
    </section>
  );
};

export default BlogPage;
