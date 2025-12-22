import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🚫</div>

        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Access Forbidden
        </h1>

        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
          <br />
          Please contact your administrator if you think this is a mistake.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
