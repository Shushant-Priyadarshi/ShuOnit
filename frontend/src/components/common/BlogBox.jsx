import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/FormateDateTime";
import { SanitizeData } from "../utils/SanitizeData";
import { motion } from "framer-motion"; // Import Framer Motion

const BlogBox = ({ data }) => {
  const { id, title, date, author, content } = data;

  return (
    <motion.div
      className="my-5 bg-black p-6 h-full rounded-lg shadow-md hover:shadow-2xl hover:bg-gray-900 duration-300 hover:scale-105"
      initial={{ opacity: 0, scale: 0.9 }} // Initial state
      whileInView={{ opacity: 1, scale: 1 }} // Animation on view
      transition={{ duration: 0.4,type:"spring", stiffness: 100 }} // Smooth transition
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the card is in view
    >
      {/* Blog Content */}
      <div className="text-left">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#7481FE] mb-4 text-center">
          {title}
        </h2>

        {/* Date and Author */}
        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <p className="italic">
            Published on : <span className="font-semibold">{formatDateTime(date)}</span>
          </p>
          <p className="italic">
            By : <span className="font-semibold">{author.name}</span>
          </p>
        </div>

        {/* Content */}
        <div className="text-gray-700 text-justify leading-relaxed">
          <div
            dangerouslySetInnerHTML={{
              __html: SanitizeData(content.substring(0, 100) + "..."),
            }}
          />
        </div>
      </div>

      {/* Read More Button */}
      <div className="text-center mt-6">
        <Link to={`/blog/${id}`}>
          <button className="bg-[#7481FE] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#6a76eb] transition duration-200">
            Read More
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogBox;
