import React from "react";
import { useForm } from "react-hook-form";
import { FiPlusSquare } from "react-icons/fi";
import UseAuth from "../../../../Hook/UseAuth";
import Swal from "sweetalert2";

const AddAsets = () => {
  const { register, handleSubmit, reset } = useForm();
  let { user } = UseAuth();
  console.log(user)

  const onSubmit = async (data) => {
    const imageFile = data.productImage[0];

    let formData = new FormData();
    formData.append("image", imageFile);

    let imgApi = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG
    }`;

    try {
      // image upload
      const imgRes = await fetch(imgApi, {
        method: "POST",
        body: formData,
      });
      console.log(imgRes)

      const imgResult = await imgRes.json();
      let imgURL = imgResult.data.display_url;
      console.log(imgResult)

      const assetData = {
        productName: data.productName,
        productImage: imgURL,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        availableQuantity: Number(data.productQuantity),
        hrEmail: data.hrEmail,
        companyName: data.companyName,
      };

      // add asset
      const assetRes = await fetch("https://assetflow-backend-tau.vercel.app/add-asset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(assetData),
      });

      if (!assetRes.ok) {
        throw new Error("Failed to add asset");
      }

      Swal.fire({
        icon: "success",
        title: "Asset Added Successfully!",
        text: "Your asset has been added to the inventory.",
        confirmButtonColor: "#2563eb",
      });

      reset();
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="card w-full max-w-xl bg-white shadow-2xl rounded-xl">
        <div className="card-body p-8">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <FiPlusSquare className="text-primary text-4xl" />
            <h2 className="text-3xl font-bold text-gray-800">
              Add New Asset
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="label font-semibold">Product Name</label>
              <input
                type="text"
                placeholder="Dell Laptop"
                className="input input-bordered w-full focus:outline-primary"
                {...register("productName", { required: true })}
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="label font-semibold">Product Image</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("productImage", { required: true })}
              />
            </div>

            {/* Type + Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label font-semibold">Product Type</label>
                <select
                  className="select select-bordered w-full"
                  {...register("productType")}
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              <div>
                <label className="label font-semibold">Quantity</label>
                <input
                  type="number"
                  placeholder="5"
                  className="input input-bordered w-full"
                  {...register("productQuantity", { required: true })}
                />
              </div>
            </div>

            {/* HR Email */}
            <div>
              <label className="label font-semibold">HR Email</label>
              <input
                defaultValue={user.email}
                type="email"
                className="input input-bordered w-full bg-gray-100"
                {...register("hrEmail", { required: true })}
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="label font-semibold">Company Name</label>
              <input
                type="text"
                placeholder="Test Company"
                className="input input-bordered w-full"
                {...register("companyName", { required: true })}
              />
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full gap-2 text-lg mt-6">
              <FiPlusSquare />
              Add Asset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAsets;
