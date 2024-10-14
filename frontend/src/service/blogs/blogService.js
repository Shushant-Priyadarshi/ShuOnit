import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/blogs`

const getAuthConfig = ()=>{
    const token = localStorage.getItem("jwt")
    if (!token) {
        throw new Error("Token does not exist!");
    }
    return {
        headers: {
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

export const getUserBlogsFromJwt=async()=>{
    try{
        const config = getAuthConfig();
        const response = await axios.get(`${BASE_URL}/user/all-blogs`,config)
        return response.data;
    }catch(e){
        handleError(e)    
    }
}

export const createBlog = async(title,content)=>{
    try{
        const config = getAuthConfig()
        const response = await axios.post(`${BASE_URL}`,{title,content},config)
        return response.data;
    }catch(e){
        handleError(e);
    }
}

export const getAllBlogs=async(page=0,size=5)=>{
    try{
        const response = await axios.get(`${BASE_URL}?page=${page}&size=${size}`)
        return response.data;
    }catch(e){
        console.error(e);
        throw e;
    }
}

export const deleteBlog = async(blogId)=>{
    try{
        const config = getAuthConfig();
        const response = await axios.delete(`${BASE_URL}/${blogId}`,config)
        return response.data

    }catch(e){
        handleError(e)
    }
}

export const getInsideTheBlog = async(blogInfo) =>{
    try{
        const config = getAuthConfig();
        const url = `${BASE_URL}/${blogInfo}`
        console.log(url);
        
        const response = await axios.get(`${BASE_URL}${blogInfo}`,config)
        return response.data;
    }catch(e){
        handleError(e)
}
}