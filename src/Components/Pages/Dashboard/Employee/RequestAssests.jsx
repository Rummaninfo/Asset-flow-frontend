import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../Hook/UseAxios";
import { FiPackage } from "react-icons/fi";
import UseAuth from "../../../../Hook/UseAuth";

const RequestAssets = () => {
  const axiosSecure = UseAxios();
  let {user} = UseAuth

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

  let handleRequest = (asset)=>{
    const requestData = {
    assetId: asset._id,
    assetName: asset.productName,
    assetType: asset.productType,
    requesterName: user.displayName,
    requesterEmail: user.email,
    hrEmail: asset.hrEmail,
    companyName: asset.companyName,
  };
  console.log(requestData)
  }

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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No assets available
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => (
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

                  <td>
                    <button
                      className="btn btn-sm btn-primary gap-2"
                      onClick={()=> handleRequest(asset._id)}
                    >
                      <FiPackage />
                      Request
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestAssets;
