import { useLoaderData, useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCart";
import { useState, useEffect } from "react";

const POSTS_PER_PAGE = 5;

const Blog = () => {
  const allPosts: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");;
    return page ? parseInt(page, 10) : 1;
  });

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => {
        const newPage = prev + 1;
        setSearchParams({ page: newPage });
        return newPage;
      });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        const newPage = prev - 1;
        setSearchParams({ page: newPage });
        return newPage;
      });
    }
  };

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  return (
    <div className="flex flex-col p-5 lg:px-48 lg:py-11">
      {currentPosts.map((post: any) => (
        <BlogCard
          key={post.id}
          postId={post.id}
          title={post.title}
          description={post.body}
        />
      ))}
      
      <div className="flex justify-between mt-5">
        {currentPage > 1 && (
          <button 
            onClick={handlePrevious} 
            className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button 
            onClick={handleNext} 
            className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
          >
            Next
          </button>
        )}
      </div>
      <div className="flex justify-center mt-5">
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Blog;
