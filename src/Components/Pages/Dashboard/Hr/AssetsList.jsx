import React, { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import UseAxios from "../../../../Hook/UseAxios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Swal from "sweetalert2";
import UseAuth from "../../../../Hook/UseAuth";
import Loading from "../../../Loading/Loading";

const AssetsList = () => {
  const axiosSecure = UseAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = UseAuth();
  const employeeRef = useRef();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  // Assets
  const {
    data: allAssets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets-list/${user?.email}`);
      return res.data;
    },
  });

 

  // Employees
  const { data: allEmployee = [] } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/${user?.email}`);
      return res.data;
    },
  });

  console.log(allEmployee, 'all employee');

  // Delete asset
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/assetlist/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: data.message || "Asset deleted successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const total = allAssets.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentAssets = allAssets.slice(startIndex, endIndex);

  const pieData = [
    {
      name: "Returnable",
      value: allAssets.filter((a) => a.productType === "Returnable").length,
      color: "#10B981",
    },
    {
      name: "Non-returnable",
      value: allAssets.filter((a) => a.productType === "Non-returnable").length,
      color: "#F59E0B",
    },
  ];

  const barData = [...allAssets]
    .sort((a, b) => b.productQuantity - a.productQuantity)
    .slice(0, 5)
    .map((a) => ({
      name:
        a.productName.length > 12
          ? a.productName.substring(0, 10) + "..."
          : a.productName,
      quantity: a.productQuantity,
      available: a.availableQuantity,
    }));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage, limit });
    }
  };

  const handleLimitChange = (e) => {
    setSearchParams({ page: 1, limit: e.target.value });
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  let hangleAssign  = ()=>{
    let selectedEmployee = employeeRef.current.value 
    console.log(selectedEmployee)
    document.getElementById("assign_modal").close();
  }

  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-center py-10 text-red-500">Error loading data</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assets List ({total})</h2>

        <div className="flex items-center gap-4">
          <span>Show:</span>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border px-3 py-1 rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Asset Types</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Top 5 Assets</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#3b82f6" />
                <Bar dataKey="available" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Available</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAssets.map((asset, index) => (
              <tr key={asset._id}>
                <td className="py-3 px-4">{startIndex + index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="py-3 px-4">{asset.productName}</td>
                <td className="py-3 px-4">{asset.productType}</td>
                <td className="py-3 px-4">{asset.productQuantity}</td>
                <td className="py-3 px-4">{asset.availableQuantity}</td>
                <td className="py-3 px-4">
                  <button
                    className="btn"
                    
                    onClick={() =>
                      
                      document.getElementById("assign_modal").showModal()
                    }
                  >
                    Assign
                  </button>
                  <button
                    className="btn ml-2"
                    onClick={() => handleRemove(asset._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Modal */}
      <dialog id="assign_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Assign Asset</h3>

          <select
            ref={employeeRef}
            className="select text-black select-bordered w-full"
          >
            <option disabled selected>
              Select Employee
            </option>
            {allEmployee.map((emp) => (
              <option key={emp._id} value={emp.employeeEmail}>
                {emp.employeeName} | {emp.employeeEmail}
              </option>
            ))}
          </select>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
              <button type="button" onClick={hangleAssign} className="btn ml-2">Assign</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssetsList;
