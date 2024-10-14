import { useEffect, useState } from "react";
import NavBar from "../../common/NavBar";
import PageTransition from "../../animation/PageTransition";

import {
  approveBlog,
  getAllPendingBlogs,
  rejectBlogs,
} from "../../../service/admin/adminService";
import Loader from "../../common/Loader";
import { SanitizeData } from "../../utils/SanitizeData";
import toast, { Toaster } from "react-hot-toast";


const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isloading, setIsLoading] = useState(true);
 


  useEffect(() => {
    const fetchAllPendingBlogs = async () => {
      try {
        const response = await getAllPendingBlogs();
        if (response) {
          setIsLoading(false);
          setBlogs(response);
        }
      } catch (e) {
        toast.error("Something went wrong!");
        throw e;
      }
    };

    fetchAllPendingBlogs();
  }, []);

  const deleteBlog = async (blogId) => {
    const choice = window.confirm("Do you want to delete this blog?");
    if (choice) {
      try {
        await rejectBlogs(blogId);
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        toast.success("Blog deleted!");
      } catch (e) {
        toast.error("Something went wrong!");
        console.error(e);
      }
    }
    return;
  };

  const handleApproveBlog = async (blogId) => {
    const choice = window.confirm("Do you want to approve this blog?");
    if (choice) {
      try {
        await approveBlog(blogId);
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        toast.success("Blog Approved!");
      } catch (e) {
        toast.error("Something went wrong!");
        console.error(e);
      }
    }
    return;
  };

  if (isloading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster />
      <NavBar />

      <div className="min-h-[82vh] px-4 overflow-y-hidden">
        <div>
          <div className="text-2xl font-semibold text-center my-3 text-black">
            Approve Blogs
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="m-3 w-full md:w-5/12 lg:w-3/12 bg-base-100 shadow-xl cursor-pointer hover:scale-105 duration-300"
              >
                <div className="card-body">
                  <h2 className="card-title">{blog.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: SanitizeData(
                        blog.content.substring(0, 100) + "..."
                      ),
                    }}
                  ></p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApproveBlog(blog.id);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlog(blog.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PageTransition />
    </>
  );
};

export default AdminPage;
