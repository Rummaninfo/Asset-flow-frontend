import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../../Hook/UseAuth";
import UseAxios from "../../../../Hook/UseAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from "../../../Loading/Loading";

const AllRequests = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const navigate = useNavigate();
  let queryClient = useQueryClient()

  // ✅ HR info (packageLimit, currentEmployees)
  const { data: hr = {} } = useQuery({
    queryKey: ["hr", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  // ✅ HR Requests list
  const {
    data: requests = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["hr-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr-requests/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  if (error) {
    return (
      <p className="text-center mt-16 text-red-500">
        Failed to load requests
      </p>
    );
  }

  // ✅ Approve / Reject
  const handleUpdateStatus = async (id, status) => {
    const isLimited = hr?.currentEmployees >= hr?.packageLimit;

    if (status === "approved" && isLimited) {
      Swal.fire({
        icon: "error",
        title: "Package Limit Exceeded",
        text: "Please upgrade your package",
        confirmButtonText: "Upgrade",
      });
      navigate("/dashboard/upgrade-package");
      return;
    }

    try {
      await axiosSecure.patch(`/requests/${id}`, { status });
          

      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Employee Requests</h2>
          <span className="badge badge-primary badge-lg">
            {requests.length}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Asset</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No requests found
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr key={req._id}>
                    <td>{index + 1}</td>

                    <td>
                      <p className="font-semibold">{req.requesterName}</p>
                      <p className="text-xs text-gray-500">
                        {req.requesterEmail}
                      </p>
                    </td>

                    <td>{req.assetName}</td>

                    <td>
                      {new Date(req.requestDate).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          req.status === "pending"
                            ? "badge-warning"
                            : req.status === "approved"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td className="text-center">
                      {req.status === "pending" ? (
                        <div className="flex justify-center gap-2">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() =>
                              handleUpdateStatus(req._id, "approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() =>
                              handleUpdateStatus(req._id, "rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm capitalize">
                          {req.status}
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
    </div>
  );
};

export default AllRequests;
