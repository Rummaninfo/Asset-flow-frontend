import React, { useState } from "react";
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
  let {user} = UseAuth()

  // URL থেকে page নিবো, নাইলে 1
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  // সব assets fetch
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
  // delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/assetlist/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["assets"],
      });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: data.message || "Asset deleted successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to delete asset",
      });
    },
  });

  // Frontend pagination
  const total = allAssets.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentAssets = allAssets.slice(startIndex, endIndex);

  // Charts data
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

  // Page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage, limit });
    }
  };

  // Limit change
  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setSearchParams({ page: 1, limit: newLimit });
  };

  if (isLoading) return  <Loading></Loading>
  if (error)
    return <p className="text-center py-10 text-red-500">Error loading data</p>;
  let handleRemove = async (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };
  return (
    <div className="p-6">
      {/* Header */}
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

      {/* Charts - Simple */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Asset Types</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Top 5 Assets</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#3b82f6" name="Total" />
                <Bar dataKey="available" fill="#10b981" name="Available" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pagination Info */}
      <div className="mb-4 text-sm text-gray-600">
        Page {page} of {totalPages} • Showing {startIndex + 1} to{" "}
        {Math.min(endIndex, total)} of {total} assets
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Available</th>
              <th className="py-3 px-4 text-left ">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAssets.map((asset, index) => (
              <tr key={asset._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{startIndex + index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="py-3 px-4 font-medium">{asset.productName}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      asset.productType === "Returnable"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {asset.productType}
                  </span>
                </td>
                <td className="py-3 px-4">{asset.productQuantity}</td>
                <td className="py-3 px-4">{asset.availableQuantity}</td>
                <td className="py-3   px-3">
                  <button className="btn ">Assign</button>
                  <button
                    onClick={() => handleRemove(asset._id)}
                    className="btn ml-2 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls - Simple */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-200 text-gray-400"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          // Show only nearby pages
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= page - 1 && pageNum <= page + 1)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded ${
                  page === pageNum
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {pageNum}
              </button>
            );
          }
          return null;
        })}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-200 text-gray-400"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetsList;   