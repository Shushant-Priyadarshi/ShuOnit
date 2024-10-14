import { useEffect, useState } from "react";
import BlogBox from "../common/BlogBox";
import Greetings from "../common/Greetings";
import NavBar from "../common/NavBar";
import { getAllBlogs } from "../../service/blogs/blogService";
import Loader from "../common/Loader";
import PageTransition from "../animation/PageTransition";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setLoading(true);
        const response = await getAllBlogs(currentPage, blogsPerPage);

        setBlogs(response.content);
        setTotalPages(response.totalPages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlogs();
  }, [currentPage, blogsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber - 1);
  

  return (
    <div className="">
      <NavBar />
      <div className="min-h-screen  ">
        <div>
        {currentPage === 0 && (
            <h1 className="text-3xl font-semibold text-blue-500">
              <Greetings />
            </h1>
          )}
        </div>

        {/* Loading Animation */}
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center ">
            {blogs.map((blog) => (
              <div key={blog.id} className="m-2 w-full md:w-5/12 lg:w-5/12">
                <BlogBox data={blog} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center my-10 ">
          <button
            onClick={() => paginate(currentPage)}
            disabled={currentPage === 0}
            className="px-4 py-2 mx-2 bg-black text-white rounded hover:bg-gray-900 disabled:bg-gray-400"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-2 rounded ${
                currentPage === index
                  ? "bg-black text-white"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 2)} // +2 to adjust for zero-indexing
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 mx-2 bg-black text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      <PageTransition/>
      
    </div>
  );
};

export default Home;

