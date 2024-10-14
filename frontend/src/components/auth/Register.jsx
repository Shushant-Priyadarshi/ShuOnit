import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../service/auth/AuthService"
import { Toaster,toast } from "react-hot-toast"
import { VscEyeClosed } from "react-icons/vsc";
import { FaEye } from "react-icons/fa";
import BackBtn from "../common/BackBtn";
import PageTransition from "../animation/PageTransition";

const Register = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate()

  const handleRegister =async(e)=>{
    e.preventDefault();
    try{
      const response = await registerUser(name,email,password)
      localStorage.setItem("auth","true")
      navigate("/")
      toast.success(response?.message);
    }catch(e){
      console.error(e);
      
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <BackBtn>Home</BackBtn>
    <div className="  md:my-0 min-h-screen bg-primary flex justify-center items-center">
      <Toaster/>
    <div className=" bg-black shadow-lg rounded-lg overflow-hidden w-full max-w-screen-md mx-4 md:mx-auto">

      {/* Form Section */}
      <div className="w-full   p-8">
        <h2 className="text-2xl font-bold text-primary text-center mb-6">
          Welcome To ShuOnIt
        </h2>

  

        

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleRegister}>
        <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="text-white w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className=" text-white w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="relative">
            <label className="block text-white">Password</label>
            <input
              type={showPassword?"text":"password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="password"
              className=" text-white w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            Register
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
  <PageTransition/>
  </>
  )
}

export default Register