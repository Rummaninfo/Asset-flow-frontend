import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../Hook/UseAuth";
import UseAxios from "../../../../Hook/UseAxios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AllRequests = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  console.log(user, "ami user");
  let navigate = useNavigate()

  // axiosSecure.get(`/user/${user.email}`)
  // .then(data=>{
  //   console.log(data, 'data asche')
  // })
  // .catch(er=>{
  //   console.log(er)
  // })

  let { data: hr = [] } = useQuery({
    queryKey: ["hr"],
    queryFn: async () => {
      let res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });
  console.log(hr, "hrrrrrrrrrrrrr");

  

  
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
  console.log(requests, "all request");

  if (isLoading) {
    return <p className="text-center mt-10">Loading requests...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load requests</p>
    );
  }

  // approve / reject handler
  const handleUpdateStatus = async (id, status, req) => {
    console.log(req, "al reqiest");

    let isLimited = hr?.currentEmployees >= hr.packageLimit;
  console.log(isLimited);
 

  if (isLimited && status === "approved") {
    Swal.fire({
      icon: "error",
      title: "Package Limit Exceeded",
      text: "আপনার প্যাকেজে ৫ জনের বেশি employee add করা যাবে না",
      confirmButtonText: "Upgrade Package",
      
    })
    navigate('/dashboard/upgrade-package')
    return; // ⛔ এখানেই থামবে
  }
    try {
      await axiosSecure.patch(`/requests/${id}`, {
        status,
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Employee Requests ({requests.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Asset</th>
              <th>Quantity</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>

                  <td>
                    <p className="font-medium">{req.requesterName}</p>
                    <p className="text-xs text-gray-500">
                      {req.requesterEmail}
                    </p>
                  </td>

                  <td>{req.assetName}</td>

                  <td>{req.requestedQuantity}</td>

                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>

                  <td>
                    {req.requestStatus === "pending" && (
                      <span className="badge badge-warning">Pending</span>
                    )}
                    {req.requestStatus === "approved" && (
                      <span className="badge badge-success">Approved</span>
                    )}
                    {req.requestStatus === "rejected" && (
                      <span className="badge badge-error">Rejected</span>
                    )}
                  </td>

                  <td className="space-x-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() =>
                            handleUpdateStatus(req._id, "approved", req)
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
                      </>
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

export default AllRequests;
