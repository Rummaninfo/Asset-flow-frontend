import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../../Hook/UseAuth";

const EmployeeProfile = () => {
  const { register, handleSubmit } = useForm({});
  let {user, userupdateProfile} = UseAuth()
  console.log(user)

  const onSubmit = (data) => {
    
    console.log("Form Data:", data);
    userupdateProfile({
        displayName: data.fullName, 
        photoURL: data.photoURL
    })
  };

  return (
    <div className="min-h-screen w-[70%] mx-auto bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-blue-200 object-cover"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                Profile
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </label>
              <input
              readOnly
              defaultValue={user.email}
                type="email"
                {...register("email")}
                className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Photo URL
              </label>
              <input
                type="url"
                {...register("photoUrl")}
                className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
