import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/admin`

const getAuthConfig = ()=>{
    const token = localStorage.getItem("jwt")
    if(!token){
        throw new Error("Token does not exist!")
    }
    return {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
};

const handleError=(e)=>{
    console.error(e);
    const errorMessage = e.response?.data?.message || "An Error Occurred!"
    toast.error(errorMessage)
    throw e;
}

export const getAllPendingBlogs = async()=>{
    try{
        const config =  getAuthConfig();
        const response = await axios.get(`${BASE_URL}/blogs/pending`,config);
        return response.data
    
    }catch(e){
        handleError(e)
    }
}

export const approveBlog = async(blogId) =>{
    try{
        const config = getAuthConfig();
        const response  = await axios.post(`${BASE_URL}/blogs/${blogId}/approve`,null,config)
        return response.data;
    }catch(e){
        handleError(e);
    }
}

export const rejectBlogs = async(blogId) =>{
    try{
        const config = getAuthConfig();
        const response  = await axios.delete(`${BASE_URL}/blog/${blogId}/reject`,config)
        return response.data;
    }catch(e){
        handleError(e);
    }
}