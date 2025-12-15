import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../Hook/UseAxios";
import UseAuth from "../../../../Hook/UseAuth";

const MyAssets = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-assets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-requests/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center mt-10">
        Loading your assets...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load your assets
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        My Assets ({requests.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Quantity</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  You have not requested any assets yet
                </td>
              </tr>
            ) : (
              requests.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>{item.assetName}</td>

                  <td>
                    <span
                      className={`badge ${
                        item.assetType === "Returnable"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {item.assetType}
                    </span>
                  </td>

                  <td>{item.companyName}</td>

                  <td>{item.requestedQuantity}</td>

                  <td>
                    {new Date(item.requestDate).toLocaleDateString()}
                  </td>

                  <td>
                    {item.requestStatus === "pending" && (
                      <span className="badge badge-warning">
                        Pending
                      </span>
                    )}

                    {item.requestStatus === "approved" && (
                      <span className="badge badge-success">
                        Approved
                      </span>
                    )}

                    {item.requestStatus === "rejected" && (
                      <span className="badge badge-error">
                        Rejected
                      </span>
                    )}
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

export default MyAssets;
