import { Post } from "@/types";
import { Link } from "react-router";

interface BlogCardProps {
  posts: Post[];
}

const imgUrl = import.meta.env.VITE_IMG_URL;

const BlogCard = ({ posts }: BlogCardProps) => {
  return (
    <div className="my-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.slice(0, 3).map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id}>
          <img
            src={imgUrl + post.image}
            alt="blog post"
            className="mb-4 w-full rounded-2xl object-contain"
            loading="lazy"
            decoding="async"
          />
          <h3 className="ml-4 line-clamp-1 font-semibold">{post.title}</h3>
          <div>
            <span className="ml-4 mt-4 text-sm">
              by<span className="font-semibold"> {post.user.fullName} </span>on
              <span className="font-semibold"> {post.updatedAt}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogCard;
