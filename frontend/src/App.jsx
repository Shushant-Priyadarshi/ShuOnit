import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageLoading from "./components/common/PageLoading";
import { lazy, Suspense, useState, useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UpdateProfile from "./components/pages/UpdateProfile";
import Footer from "./components/common/Footer";
import ErrorPage from "./components/common/ErrorPage";
import InsideBlog from "./components/pages/Blogs/InsideBlog";
import OAuth2RedirectHandler from "./service/auth/OAuth2RedirectHandler";
import { checkUserRole } from "./components/utils/checkUserRole";
import About from "./components/pages/About";
import { showNotification } from "./components/utils/showNotification"; // Import the notification function
import { Toaster } from 'react-hot-toast'; 
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

// Lazy-loaded components
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const Home = lazy(() => import("./components/pages/Home"));
const CreateBlog = lazy(() => import("./components/pages/Blogs/CreateBlog"));
const Profile = lazy(() => import("./components/pages/Profile"));
const AdminPage = lazy(() => import("./components/pages/admin/AdminPage"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = checkUserRole();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // WebSocket connection for notifications
  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_BACKEND_URL}/websocket`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log('WebSocket connected!');

      stompClient.subscribe('/topic/notifications', (message) => {
        console.log('Received notification:', message.body);
        showNotification(message.body); 
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <Router>
      {isLoading ? (
        <PageLoading />
      ) : (
        <Suspense fallback={<PageLoading />}>
          <Toaster />
          <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/create-blog"
                element={<ProtectedRoute element={<CreateBlog />} />}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route
                path="/update-profile"
                element={<ProtectedRoute element={<UpdateProfile />} />}
              />
              <Route
                path="/blog/:blogId"
                element={<ProtectedRoute element={<InsideBlog />} />}
              />
              <Route path="/login/google-auth" element={<OAuth2RedirectHandler />} />
              <Route path="/admin" element={isAdmin && <AdminPage />} />
             
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          </div>
        </Suspense>
      )}
      <Footer />
    </Router>
  );
}

export default App;
