import { useLocation } from "react-router-dom";
import NavBar from "../../common/NavBar";
import { getInsideTheBlog } from "../../../service/blogs/blogService";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/FormateDateTime";
import Loader from "../../common/Loader";
import PageTransition from "../../animation/PageTransition";
import { SanitizeData } from "../../utils/SanitizeData";
const InsideBlog = () => {
  const location = useLocation();
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      const response = await getInsideTheBlog(location.pathname);
      if (response) {
        console.log(response);
        setBlogData(response);
        setLoading(false);
      }
    };
    getBlog();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />

      <div className="container h-screen mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
        <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">{blogData.title}</h1>
        
        <div className="text-black text-sm sm:text-2xl mb-2 sm:mb-4">
          <span className="font-semibold">By: {blogData.author.name}</span>
          <span className="mx-1 sm:mx-2">|</span>
          <span>{formatDateTime(blogData.date)}</span>
        </div>

        <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl mb-4 sm:mb-6 text-black text-xl">
          <p dangerouslySetInnerHTML={{__html:SanitizeData(blogData.content)}}></p>
        </div>
      </div>

      <PageTransition />
    </>
  );
};

export default InsideBlog;
