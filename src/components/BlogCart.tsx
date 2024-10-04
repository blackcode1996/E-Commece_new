import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  postId: number;
  title: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ postId, title, description }) => {
  return (
    <Link to={`/blog/${postId}`}>
      <div className="bg-gray-100 p-5 mb-10">
        <h1 className="font-bold text-2xl mb-2">{title}</h1>
        <p className="my-3">{description}</p>
        <button className="text-white font-semibold bg-blue-600 hover:bg-blue-800 p-2 my-1 rounded">
          Read More...
        </button>
      </div>
    </Link>
  );
};

export default BlogCard;
