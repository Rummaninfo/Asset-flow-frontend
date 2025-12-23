import React, { useState } from "react";
import UseAuth from "../../../../Hook/UseAuth";
import { FaUserCircle } from "react-icons/fa";

const HrProfile = () => {
  const { user, updateUserProfile, loading } = UseAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUserProfile(name, photo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <FaUserCircle className="text-5xl text-indigo-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            My Profile
          </h2>
          <p className="text-sm text-gray-500">
            Manage your personal information
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-5">
          <img
            src={photo || "https://i.ibb.co/7G5fZK1/user.png"}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md object-cover"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100
                         border border-gray-200 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Photo URL
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-600
                       text-white py-2.5 rounded-lg font-semibold
                       hover:from-indigo-600 hover:to-blue-700
                       transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default HrProfile;
