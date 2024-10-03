import { useLoaderData } from "react-router-dom";

const SingleBlog = () => {
  const data: any = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Blog post header */}
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <p className="text-gray-500 text-sm">
            Published by User {data.userId}
          </p>
        </div>

        {/* Featured image */}
        <img
          src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c"
          alt="Featured"
          className="w-full h-auto mb-8"
        />

        {/* Blog post content */}
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
          <p>{data.body}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
