import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/auth/AuthService";
import toast, { Toaster } from "react-hot-toast";
import { VscEyeClosed } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import BackBtn from "../common/BackBtn";
import PageTransition from "../animation/PageTransition"

const Login = () => {
  const googleLogin=()=>{
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`
  
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("auth", "true");
      navigate("/");
      toast.success(response?.message);
    } catch (e) {
      console.error(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Toaster />
    <BackBtn>Home</BackBtn>
    <div className="min-h-screen bg-primary flex justify-center items-center shadow-2xl">
      <div className="flex bg-black shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="flex justify-center items-center">

        <div className="hidden  md:block p-3 ">
          <img
            src="https://img.freepik.com/free-photo/toy-bricks-table-with-word-my-blog_144627-47466.jpg"
            alt="Login Visual"
            className="object-contain rounded-lg  shadow-lg"
            />
        </div>
           </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            Welcome Back
          </h2>

          {/* Google OAuth Button */}
          <div className="flex justify-center mb-6">
            <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full" onClick={googleLogin}>
              <img
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              <p>Continue with Google</p>
            </button>
          </div>

          <div className="text-center text-white mb-4">or</div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-white">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className=" text-white w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-primary"
              />
            </div>

            <div className="relative">
              <label className="block text-white">Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="Password"
                value={password}
                required
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                className="text-white w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-primary"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute bottom-3 right-0 pr-3 flex items-center text-lg leading-5"
              >
                {showPassword ? <FaEye /> : <VscEyeClosed />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-white mt-4">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-primary  hover:underline"
              type="submit"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
    <PageTransition/>
    </>
  );
};

export default Login;
