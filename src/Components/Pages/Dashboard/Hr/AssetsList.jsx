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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">
        Assets List
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
              <th className="text-center">Total Qty</th>
              <th className="text-center">Available</th>
              <th className="text-center">Date Added</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-slate-500"
                >
                  No assets found
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => (
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
                    {asset.productQuantity}
                  </td>

                  <td className="text-center font-semibold">
                    {asset.availableQuantity}
                  </td>

                  <td className="text-center text-sm text-slate-600">
                    {new Date(
                      asset.dateAdded
                    ).toLocaleDateString()}
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
