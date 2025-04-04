import { Post } from "@/types";
import { Link } from "react-router";

interface BlogPostListProps {
  posts: Post[];
}

const imgUrl = import.meta.env.VITE_IMG_URL;

function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="my-8 grid gap-16 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id}>
          <img
            className="mb-4 w-full rounded-xl"
            src={imgUrl + post.image}
            alt="blog post"
            loading="lazy"
            decoding="async"
          />
          <h2 className="line-clamp-1 text-xl font-extrabold">{post.title}</h2>
          <h3 className="my-2 line-clamp-3 text-base font-[400]">
            {post.content}
          </h3>
          <div className="mt-4 text-sm">
            <span>
              by<span className="font-[600]"> {post.user.fullName} </span>on
              <span className="font-[600]"> {post.updatedAt}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogPostList;
