import { onePostQuery, postsQuery } from "@/api/query";
import BackButton from "@/components/BackButton";
import RichTextRenderer from "@/components/blogs/RichTextRenderer";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router";

const BlogDetailPage = () => {
  const { postId } = useLoaderData();
  const { data: postDetail } = useSuspenseQuery(onePostQuery(postId));
  const { data: postsData } = useSuspenseQuery(postsQuery("?limit=6"));

  const post = postDetail.post as Post;
  const posts = postsData.posts as Post[];
  const imgUrl = import.meta.env.VITE_IMG_URL;

  return (
    <div className="container max-md:px-0">
      <section className="flex flex-col lg:flex-row">
        {/* Left Section */}
        <section className="w-full lg:w-3/4 lg:pr-16">
          <BackButton>
            <Link to={"/blogs"}>
              <Icons.arrowLeft />
              All Posts
            </Link>
          </BackButton>
          {post ? (
            <>
              <h2 className="mb-3 text-3xl font-bold">{post.title}</h2>
              <div className="mt-4 text-sm">
                <span>
                  by<span className="font-[600]"> {post.user.fullName} </span>on
                  <span className="font-[600]"> {post.updatedAt}</span>
                </span>
              </div>
              <h3 className="my-6 font-[400]">{post.content}</h3>
              <img
                src={imgUrl + post.image}
                alt={post.title}
                className="w-full rounded-xl"
                loading="lazy"
                decoding="async"
              />
              <RichTextRenderer content={postDetail.body} className="my-8" />
              <div className="mb-12 space-x-2">
                {post.tags.map((tag) => (
                  <Button variant={"secondary"} key={tag.name}>
                    {tag.name}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <p className="mb-16 mt-8 text-center text-xl font-bold text-muted-foreground lg:mt-24">
              No post found
            </p>
          )}
        </section>

        {/* Right Section */}
        <section className="w-full pt-12 lg:mt-14 lg:flex-1">
          <div className="mb-8 flex items-center gap-2 font-semibold">
            <Icons.layers />
            <h3 className="">Other Blog Posts</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-1">
            {posts.map((post) => (
              <Link
                to={`/blogs/${post.id}`}
                key={post.id}
                className="mb-6 flex items-start gap-2"
              >
                <img
                  src={imgUrl + post.image}
                  alt="blog post"
                  className="w-1/4 rounded"
                  loading="lazy"
                  decoding="async"
                />
                <div className="line-clamp-2 w-3/4 text-sm font-[500] text-muted-foreground">
                  <p className="">{post.content}</p>
                  <i className="">... see more</i>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default BlogDetailPage;
