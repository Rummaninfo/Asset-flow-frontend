import React from "react";
import { useForm } from "react-hook-form";
import { FiPlusSquare } from "react-icons/fi";
import UseAxios from "../../../../Hook/UseAxios";

const AddAsets = () => {
  const { register, handleSubmit, reset } = useForm();
  let axiosSecure = UseAxios();

  const onSubmit = async (data) => {
    const imageFile = data.productImage[0];
    console.log(data);

    let formData = new FormData();
    formData.append("image", imageFile);
    let imgApi = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG
    }`;
    axiosSecure
      .post(imgApi, formData)
      .then((result) => {
        let imgURL = result.data.data.display_url;
        const assetData = {
          productName: data.productName,
          productImage: imgURL,
          productType: data.productType,
          productQuantity: Number(data.productQuantity),
          availableQuantity: Number(data.productQuantity),
          // dateAdded: new Date(),
          hrEmail: data.hrEmail,
          companyName: data.companyName,
        };
        axiosSecure
          .post("/add-asset", assetData)
          .then((r) => {
            console.log(r);
          })
          .catch((er) => {
            console.log(er);
          });
      })
      .catch((er) => {
        console.log(er);
      });

    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiPlusSquare className="text-primary text-3xl" />
            <h2 className="text-2xl font-bold">Add New Asset</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="label font-medium">Product Name</label>
              <input
                type="text"
                placeholder="Dell Laptop"
                className="input input-bordered w-full"
                {...register("productName", { required: true })}
              />
            </div>

            {/* Product Image (File) */}
            <div>
              <label className="label font-medium">Product Image</label>
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
                <label className="label font-medium">Product Type</label>
                <select
                  className="select select-bordered w-full"
                  {...register("productType")}
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              <div>
                <label className="label font-medium">Quantity</label>
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
              <label className="label font-medium">HR Email</label>
              <input
                type="email"
                placeholder="hr@testcompany.com"
                className="input input-bordered w-full"
                {...register("hrEmail", { required: true })}
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="label font-medium">Company Name</label>
              <input
                type="text"
                placeholder="Test Company"
                className="input input-bordered w-full"
                {...register("companyName", { required: true })}
              />
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full gap-2 mt-4">
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
