import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/common/Loader";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the token from the URL
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token securely in localStorage (or sessionStorage)
      localStorage.setItem("jwt", token);
      localStorage.setItem("auth",true)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    
      navigate("/");
      window.location.reload();
    } else {
      console.error("No token found in the URL.");
    }
  }, [location.search, navigate]);

  return <Loader/>;
};

export default OAuth2RedirectHandler;
