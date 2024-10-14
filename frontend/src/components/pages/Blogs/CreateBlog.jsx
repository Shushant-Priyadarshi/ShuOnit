import { useRef, useState } from "react";
import NavBar from "../../common/NavBar";
import JoditEditor from "jodit-react";

import { createBlog } from "../../../service/blogs/blogService";
import toast, { Toaster } from "react-hot-toast";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');

  const editor = useRef(null);

  const config = {
    placeholder: "Start writing your blog content...",
    toolbarSticky: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "link",
     
      "ul",
      "ol",
      "source",
      "|",
      "align",
      "undo",
      "redo",
      "hr",
      "eraser",
      "fullsize",
      "|",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
    spellcheck: true,
    language: "en",
    height: 300,
  };


  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await createBlog(title, content);
      if (!response) {
        toast.error("Something went wrong!");
      }
      toast.success(response?.message);
      setTitle('')
      setContent('')
    } catch (e) {
      console.error(e);
      throw e;
    }
    
  };

  return (
    
    <div className=" md:h-[90vh] ">
      <Toaster />
      <NavBar />

      <div className="max-w-6xl mx-1 md:mx-auto m-4 p-4 bg-black shadow-md rounded-lg ">
        <h2 className="text-2xl font-bold mb-4 text-primary">Create New Blog</h2>
        <form onSubmit={handleCreateBlog}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="title"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="text-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Content Input using JoditEditor */}
          <div className="mb-4 text-black">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="content"
            >
              Blog Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={newContent => setContent(newContent)}
              onChange={newContent => {}}

            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md  transition duration-300"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
