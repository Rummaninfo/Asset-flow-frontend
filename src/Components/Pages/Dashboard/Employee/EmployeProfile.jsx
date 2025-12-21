import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../../Hook/UseAuth";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";

const EmployeeProfile = () => {
  const { register, handleSubmit, reset } = useForm({});
  const { user } = UseAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const auth = getAuth();

  // ডিফল্ট ভ্যালু সেট করুন যখন কম্পোনেন্ট লোড হয়
 useEffect(() => {
    if (user) {
      reset({
        fullName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Firebase updateProfile সরাসরি কল করুন
      await updateProfile(auth.currentUser, {
        displayName: data.fullName,
        photoURL: data.photoURL || null
      });
      
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
      
      // সফল আপডেটের পর ফর্ম রিফ্রেশ
      reset({
        fullName: data.fullName,
        email: user.email,
        photoURL: data.photoURL || ''
      });
      
      // পৃষ্ঠা রিলোড না দিয়ে UI আপডেট করার জন্য
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Update error:", error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile' 
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // যদি ইউজার ডেটা লোডিং হয়
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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

        {/* Success/Error Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message.text}
            {message.type === 'success' && (
              <p className="text-sm mt-1">Page will refresh in a moment...</p>
            )}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-blue-200 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                Profile
              </div>
            </div>
          </div>

          {/* Current User Info */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.displayName || 'No Name Set'}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name *
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
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
                type="email"
                defaultValue={user.email}
                className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Photo URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Photo URL
              </label>
              <input
                type="url"
                {...register("photoURL")}
                placeholder="https://example.com/photo.jpg"
                className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a valid image URL (optional)
              </p>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={isUpdating}
              className={`w-full mt-8 ${
                isUpdating 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center`}
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;