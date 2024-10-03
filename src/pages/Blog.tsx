import { useLoaderData } from "react-router-dom";
import BlogCard from "../components/BlogCart";

const Blog = () => {
  const data = useLoaderData();

  console.log(data);

  return (
    <div className="flex flex-col p-5 lg:px-48 lg:py-11">
      {data && data.map((post: any) => (
        <BlogCard
          postId={post.id}
          title={post.title}
          description={post.body}
        />
      ))}
    </div>
  );
};

export default Blog;
