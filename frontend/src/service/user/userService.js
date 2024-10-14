import axios from "axios";
import toast from "react-hot-toast";
import axiosRetry from "axios-retry";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

axiosRetry(axios, { retries: 3 });

const getAuthConfig = (navigate) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    localStorage.removeItem("jwt")
    localStorage.setItem("auth","false")
    navigate("/login");
    
    return ;
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// const handleError = (e) => {
//   console.error(e);
//   const errorMessage = e.response?.data?.message || "An Error Occurred!";
//   toast.error(errorMessage);
//   throw e;
// };

export const getUserProfileFromJWT = async (navigate) => {
  try {
    const config = getAuthConfig(navigate);

    // If config is null, exit early (no token scenario)
    if (!config) {
      return; // Avoid unnecessary API call if the token is missing
    }

    // Make the API request with valid config
    const response = await axios.get(`${BASE_URL}/profile`, config);
    return response.data;
  } catch (e) {
    console.error(e);
    
  }
};

export const updateUserProfile =async(name,bio)=>{
  try{
    const config = getAuthConfig();
    if(!config){
      return;
    }
    const response = await axios.put(`${BASE_URL}`,{name,bio},config)
    if(response){
      toast.success("Profile Updated!")
      return response.data;
    }
  }catch(e){
    console.error(e);
  }
}
