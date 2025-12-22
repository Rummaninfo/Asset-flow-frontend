import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="text-7xl font-bold text-blue-500 mb-4">404</div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or was moved.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
