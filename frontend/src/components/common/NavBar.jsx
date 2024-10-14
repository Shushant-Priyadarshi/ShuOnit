import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { getUserProfileFromJWT } from "../../service/user/userService";
// import useWebSockets from "../utils/useWebsockets";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const isAuthenticated = localStorage.getItem("auth") === "true";

  // Function to fetch user profile and set the admin status
  const checkUserRole = async () => {
    try {
      const profile = await getUserProfileFromJWT();
      setIsAdmin(profile?.role === "ROLE_ADMIN");
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      setIsAdmin(false); // Set isAdmin to false in case of error
    }
  };

  // Use useEffect to check the user role on component mount
  useEffect(() => {
    if (isAuthenticated) {
      checkUserRole();
    }
  }, [isAuthenticated]); // Re-run when `isAuthenticated` changes

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-[#7481FE] font-bold text-xl">
          <Link to="/">ShuOnIt</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Links (Hidden on mobile) */}
        <div className="hidden md:flex space-x-6 text-lg">
          <Link
            to={"/"}
            className="text-[#7481FE] hover:text-gray-300 duration-300 hover:scale-110 underline-animate"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-[#7481FE] hover:text-gray-300 duration-300 hover:scale-110 underline-animate"
          >
            About
          </Link>
          <Link
            to={"/profile"}
            className="text-[#7481FE] hover:text-gray-300 duration-300 hover:scale-110 underline-animate"
          >
            Profile
          </Link>

          {/* Admin Panel Link (conditionally rendered) */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className="text-[#7481FE] hover:text-gray-300 duration-300 hover:scale-110 underline-animate"
            >
              Admin Panel
            </Link>
          )}

          {/* Logout button */}
          {isAuthenticated && (
            <Link
              className="text-[#7481FE] hover:text-gray-300 duration-300 hover:scale-110 underline-animate"
            >
              <LogoutBtn />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`${
          isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
        } z-10 transform transition-all duration-300 ease-in md:hidden bg-gray-800  0 absolute w-full left-0 top-16 p-4 overflow-hidden text-center flex flex-col gap-3`}
      >
        <Link
          to={"/"}
          className="block  text-white hover:text-gray-300 delay-150 hover:-translate-y-1 transition ease-in-out duration-300"
        >
          Home
        </Link>
        <Link
          to={"/about"}
          className="block text-white hover:text-gray-300 delay-150 hover:-translate-y-1 transition ease-in-out duration-300"
        >
          About
        </Link>
        <Link
          to={"/profile"}
          className="block text-white hover:text-gray-300 delay-150 hover:-translate-y-1 transition ease-in-out duration-300"
        >
          Profile
        </Link>

        {/* Admin Panel Link on Mobile */}
        {isAuthenticated && isAdmin && (
          <Link
            to="/admin"
            className="block text-white hover:text-gray-300 delay-150 hover:-translate-y-1 transition ease-in-out duration-300"
          >
            Admin Panel
          </Link>
        )}

        {/* Logout button */}
        {isAuthenticated && (
          <Link className="text-white hover:text-gray-300 duration-300 hover:scale-110">
            <LogoutBtn />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
