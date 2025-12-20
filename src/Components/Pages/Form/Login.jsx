import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import UseAuth from "../../../Hook/UseAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { signinuser } = UseAuth()
  let navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);

    signinuser(data.email, data.password)
      .then((result) => {
        navigate("/dashboard")
        Swal.fire({
          title: "Login Successful",
          text: "Welcome back!",
          icon: "success",
          confirmButtonColor: "#14B8A6",
        });

        reset();
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-2">Welcome Back</h2>
      <p className="text-center text-[#64748B] mb-6">
        Login to your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block font-medium text-[#0F172A] mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-[#0F172A] mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-[#14B8A6] text-white font-semibold hover:bg-[#0D9488] transition-all shadow"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center mt-5 text-[#64748B] text-sm">
        Don't have an account?{" "}
        <a href="/register" className="text-[#0D9488] font-semibold hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
