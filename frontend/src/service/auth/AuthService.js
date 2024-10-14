  import axios from "axios";
  import toast from "react-hot-toast";

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

  export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      if (!response) {
        throw new Error("Login Failed!");
      } else {
        localStorage.setItem("jwt", response?.data?.token);
        return response.data;
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.message || "An error occured!";
      toast.error(errorMessage);
      throw e;
    }
  };


  export const registerUser=async(name,email,password)=>{
      try{
          const response = await axios.post(`${BASE_URL}/register`,{name,email,password})
          if(!response){
              throw new Error("Registration Failed!")   
          }else{
              localStorage.setItem("jwt", response?.data?.token)
              return response.data
          }
      }catch(e){
          console.error(e);
          const errorMessage =  e.response?.data?.message || "An error occured!";
          toast.error(errorMessage)
          throw e;
      }
  }