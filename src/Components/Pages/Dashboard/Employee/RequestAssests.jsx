import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxios from "../../../../Hook/UseAxios";
import UseAuth from "../../../../Hook/UseAuth";
import { FiPackage } from "react-icons/fi";
import UseRole from "../../../../Hook/UseRole";


const RequestAssets = () => {
  const axiosSecure = UseAxios();

 
  const { user } = UseAuth();
  console.log(user)

  const [quantities, setQuantities] = useState({});

  const {
    data: assets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employee-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee-assets");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading assets...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load assets
      </p>
    );
  }

  // 🔹 single function for + / -
  const updateQty = (asset, type) => {
    setQuantities((prev) => {
      const current = prev[asset._id] || 1;

      if (type === "inc" && current < asset.availableQuantity) {
        return { ...prev, [asset._id]: current + 1 };
      }

      if (type === "dec" && current > 1) {
        return { ...prev, [asset._id]: current - 1 };
      }

      return prev;
    });
  };

  // 🔹 send request
  const handleRequest = async (asset) => {
    console.log(asset,'asses')
    const requestData = {
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      requestedQuantity: quantities[asset._id] || 1,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      
    };

    axiosSecure.post("/asset-requests", requestData)
    .then(request=>{
      console.log(request)
    })
    .catch(er=>{
      console.log(er)
    })

    console.log("Request Sent:", requestData);

    // await axiosSecure.post("/asset-requests", requestData);

    // reset quantity after request
    setQuantities((prev) => ({
      ...prev,
      [asset._id]: 1,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Request Assets ({assets.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Available</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No assets available
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => {
                const qty = quantities[asset._id] || 1;

                return (
                  <tr key={asset._id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={asset.productImage}
                        alt={asset.productName}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>

                    <td>{asset.productName}</td>

                    <td>
                      <span
                        className={`badge ${
                          asset.productType === "Returnable"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {asset.productType}
                      </span>
                    </td>

                    <td>{asset.availableQuantity}</td>

                    {/* Quantity */}
                    <td className="flex items-center gap-2">
                      <button
                        className="btn btn-xs"
                        disabled={qty === 1}
                        onClick={() => updateQty(asset, "dec")}
                      >
                        -
                      </button>

                      <span className="font-semibold">{qty}</span>

                      <button
                        className="btn btn-xs"
                        disabled={qty === asset.availableQuantity}
                        onClick={() => updateQty(asset, "inc")}
                      >
                        +
                      </button>
                    </td>

                    {/* Action */}
                    <td>
                      <button
                        className="btn btn-sm btn-primary gap-2"
                        onClick={() => handleRequest(asset)}
                      >
                        <FiPackage />
                        Request
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAssets;
