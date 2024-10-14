import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
