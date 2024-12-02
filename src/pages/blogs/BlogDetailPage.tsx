import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const { postId } = useParams();

  return <div>BlogDetailPage</div>;
};

export default BlogDetailPage;
