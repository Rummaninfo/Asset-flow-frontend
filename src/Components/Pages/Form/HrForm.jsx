import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hook/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UseAxios from "../../../Hook/UseAxios";
import axios from "axios";

const HrForm = () => {
  let { createuser } = UseAuth();
  let axiosSecure = UseAxios();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  // Watch uploaded image

  const onSubmit = (data) => {
    let profileImg = data.photo[0];

 


    createuser()
      .then((result) => {
        console.log(result)
        let formData = new FormData();
        formData.append("image", profileImg);
        let imgApi = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_IMG
        }`;
        axios
          .post(imgApi, formData)
          .then((a) => {
            let photoURL = a.data.data.display_url

               const payload = {
      name: data.name,
      companyName: data.companyName,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
        photoURL,
      role: "hr",
      packageLimit: 5,
      currentEmployees: 0,
      subscription: "basic",
    };


         axiosSecure
          .post("/register", payload)
          .then((result=>{
            console.log("data successfully insert", result)
          }))
          .catch(er=>{
            console.log('data not successfully', er)
          })




          })
          .catch((er) => {
            console.log(er);
          });

     
       
        navigate("/");
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonColor: "#14B8A6",
          background: "#ECFDF5",
        });
      })
      .catch((er) => {
        console.log(er);
      });

    reset;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">
        HR Registration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* NAME */}
        <div>
          <label className="block mb-1 font-medium text-[#0F172A]">
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]"
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* COMPANY NAME */}
        <div>
          <label className="block mb-1 font-medium text-[#0F172A]">
            Company Name
          </label>
          <input
            {...register("companyName", {
              required: "Company name is required",
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]"
            placeholder="Enter company name"
          />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        {/* COMPANY LOGO FILE UPLOAD */}

        <label className="label">images</label>

        <input
          type="file"
          {...register("photo", { required: true })}
          className="file-input w-full"
          placeholder="images"
        />

        {/* EMAIL */}
        <div>
          <label className="block mb-1 font-medium text-[#0F172A]">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                message: "Invalid email",
              },
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]"
            placeholder="email@company.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block mb-1 font-medium text-[#0F172A]">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#14B8A6]"
            placeholder="Create password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* DOB */}
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
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[#14B8A6] text-white font-semibold hover:bg-[#0D9488] transition-all shadow"
        >
          Register as HR
        </button>
      </form>
    </div>
  );
};

export default HrForm;
