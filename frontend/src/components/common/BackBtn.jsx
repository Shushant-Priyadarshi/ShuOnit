import { Link } from "react-router-dom";

const BackBtn = ({ children }) => {
  return (
    <Link to={"/"}> 
      <div className="absolute top-5 left-3 bg-black p-2 rounded-lg text-white font-semibold shadow-lg">
        {children}
      </div>
    </Link>
  );
};

export default BackBtn;
