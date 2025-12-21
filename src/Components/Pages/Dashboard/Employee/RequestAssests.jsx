import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxios from "../../../../Hook/UseAxios";
import UseAuth from "../../../../Hook/UseAuth";
import { FiPackage } from "react-icons/fi";

const RequestAssets = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();

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
  console.log(assets, 'my assets')

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-slate-500">
        Loading assets...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load assets
      </p>
    );
  }

  // 🔹 quantity update
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
    const requestData = {
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      // requestedQuantity: quantities[asset._id] || 1,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      
    };

    try {
      await axiosSecure.post("/asset-requests", requestData);

      // reset quantity
      setQuantities((prev) => ({
        ...prev,
        [asset._id]: 1,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">
        Request Assets
        <span className="ml-2 text-sm text-slate-500">
          ({assets.length})
        </span>
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <table className="table w-full">
          <thead className="bg-slate-100 text-slate-700 text-sm">
            <tr>
              <th className="py-4">#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th className="text-center">Available</th>
              {/* <th className="text-center">Quantity</th> */}
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-slate-500"
                >
                  No assets available
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => {
                const qty = quantities[asset._id] || 1;

                return (
                  <tr
                    key={asset._id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="font-medium">
                      {index + 1}
                    </td>

                    <td>
                      <img
                        src={asset.productImage}
                        alt={asset.productName}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                    </td>

                    <td className="font-medium text-slate-800">
                      {asset.productName}
                      <p>{asset.companyName}</p>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          asset.productType === "Returnable"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {asset.productType}
                      </span>
                    </td>

                    <td className="text-center font-semibold">
                      {asset.availableQuantity}
                    </td>

                    {/* Quantity */}
                    {/* <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="btn btn-xs btn-outline"
                          disabled={qty === 1}
                          onClick={() =>
                            updateQty(asset, "dec")
                          }
                        >
                          −
                        </button>

                        <span className="w-6 text-center font-semibold">
                          {qty}
                        </span>

                        <button
                          className="btn btn-xs btn-outline"
                          disabled={
                            qty === asset.availableQuantity
                          }
                          onClick={() =>
                            updateQty(asset, "inc")
                          }
                        >
                          +
                        </button>
                      </div>
                    </td> */}

                    {/* Action */}
                    <td className="text-center">
                      <button
                        className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                        onClick={() =>
                          handleRequest(asset)
                        }
                      >
                        <FiPackage className="text-base" />
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
