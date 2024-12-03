import { Post } from "@/types";
import { Link } from "react-router-dom";

interface BlogCardProps {
  posts: Post[];
}

const BlogCard = ({ posts }: BlogCardProps) => {
  return (
    <div className="my-8 grid gap-8 max-sm:px-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.slice(0, 3).map((post) => (
        <Link to={`/blogs/${post.id}`} className="" key={post.id}>
          <img
            src={post.image}
            alt="blog post"
            className="mb-4 w-full rounded-2xl"
          />
          <h3 className="ml-4 line-clamp-1 font-semibold">{post.title}</h3>
          <div className="">
            <span className="ml-4 mt-4 text-sm">
              by<span className="font-semibold"> {post.author} </span>on
              <span className="font-semibold"> {post.updated_at}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogCard;
