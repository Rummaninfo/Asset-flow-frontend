import React from "react";

const EmployeeForm = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-[#0F172A]">
        Employee Registration
      </h2>

      <p className="text-[#64748B] mb-6">
        Please fill out the form to create your employee account.
      </p>

      <form className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">Department</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="e.g. Engineering, Marketing, HR"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="Create a password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[#14B8A6] text-white font-semibold hover:bg-[#0D9488] transition-all duration-300 shadow"
        >
          Register as Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
