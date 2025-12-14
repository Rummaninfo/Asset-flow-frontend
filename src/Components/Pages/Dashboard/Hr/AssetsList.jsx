import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../Hook/UseAxios";

const AssetsList = () => {
  const axiosSecure = UseAxios();

  const {
    data: assets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets-list");
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Assets List ({assets.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Total Qty</th>
              <th>Available</th>
              <th>Date Added</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No assets found
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

                  <td>{asset.productQuantity}</td>
                  <td>{asset.availableQuantity}</td>

                  <td>
                    {new Date(asset.dateAdded).toLocaleDateString()}
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

export default AssetsList;
