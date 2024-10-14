import { useEffect, useState } from "react";
import NavBar from "../common/NavBar";
import { getUserProfileFromJWT } from "../../service/user/userService";
import {
  deleteBlog,
  getUserBlogsFromJwt,
} from "../../service/blogs/blogService";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PageTransition from "../animation/PageTransition";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]); // Initialize blogs as an empty array
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, blogsData] = await Promise.all([
          getUserProfileFromJWT(navigate),
          getUserBlogsFromJwt(),
        ]);
        setUserData(profileData);
    
        
        setBlogs(blogsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleDeleteBlog = async (id) => {
    const choice = window.confirm("Do you want to delete this blog?");
    if (choice) {
      try {
        const response = await deleteBlog(id);
        if (!response) {
          toast.error("Something went wrong!", { position: "bottom-center" });
          window.location.reload();
          return;
        }
        setBlogs(blogs.filter((blog) => blog.id !== id));
        toast.success("Blog Deleted Successfully!", {
          position: "bottom-center",
        });
      } catch (e) {
        console.error(e);
        toast.error("An error occurred while deleting the blog.");
      }
    }
    return;
  };

  return (
    <>
      <Toaster />
      <NavBar />
      {loading ? (
        <Loader />
      ) : (
        <div className="  min-h-screen ">
          <div className=" max-w-5xl mx-auto p-6">
            <div className="relative bg-black shadow-md rounded-lg p-3 md:p-6 flex items-center">
              <Link to={"/update-profile"}>
                <div className="text-xl md:text-2xl absolute top-7  right-3 shadow-lg rounded-full p-1 md:p-3 bg-primary text-white  cursor-pointer">
                  <FaUserEdit className="" />
                </div>
              </Link>
              {/* <img
                className="w-24 h-24 rounded-full mr-6"
                src={
                  userData.picture
                    ? userData.picture
                    : "https://via.placeholder.com/150"
                }
                alt="User Avatar"
              /> */}
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {userData && userData.name}
                </h1>
                <p className="text-white">{(userData && userData.bio) || ""}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Your Blogs</h2>
                <Link to={"/create-blog"}>
                  <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300">
                    + Add New Blog
                  </button>
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-6">
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-black p-6 rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {blog.title}
                        </h3>
                        {/* Render the content as HTML using dangerouslySetInnerHTML */}
                        <div
                          className="text-white"
                          dangerouslySetInnerHTML={{
                            __html: blog.content.substring(0, 100) + "...",
                          }}
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-black text-center mt-7 font-semibold text-3xl">
                    Create Your First Blog
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <PageTransition />
    </>
  );
};

export default Profile;
