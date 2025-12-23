import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import UseAxios from "../../../Hook/UseAxios";
import UseAuth from "../../../Hook/UseAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const EmployeeForm = () => {
  const axiosSecure = UseAxios();
  const navigate = useNavigate();
  const { createuser } = UseAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Create Firebase user
      const result = await createuser(data.email, data.password);

      // 2️⃣ Update Firebase profile (FIX displayName null)
      await updateProfile(result.user, {
        displayName: data.name,
      });

      // 3️⃣ Backend payload
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password, 
        dateOfBirth: data.dateOfBirth,
        role: "employee",
      };

      // 4️⃣ Save user in backend DB
      await axiosSecure.post("/register", payload);

      Swal.fire({
        title: "Registration Successful!",
        text: "Employee account created successfully.",
        icon: "success",
        confirmButtonColor: "#14B8A6",
      });

      reset();
      navigate("/");
    } catch (error) {
      console.error("Employee Registration Error:", error);
      Swal.fire({
        title: "Registration Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-[#0F172A]">
        Employee Registration
      </h2>

      <p className="text-[#64748B] mb-6">
        Please fill out the form to create your employee account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">
            Full Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">
            Email Address
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#0F172A] mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium text-[#0F172A]">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]"
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">
              {errors.dateOfBirth.message}
            </p>
          )}
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
