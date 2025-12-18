import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUsers, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAxios from "../../../../Hook/UseAxios";
import UseAuth from "../../../../Hook/UseAuth";

const HrEmployeeList = () => {
  const queryClient = useQueryClient();
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const [search, setSearch] = useState("");

  // 🔹 Load employees under HR
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["hrEmployee", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr/employees/${user.email}`);
      return res.data?.employees || [];
    },
  });

  // 🔹 Delete mutation
  const deleteEmployeeMutation = useMutation({
    mutationFn: async (_id) => {
      const res = await axiosSecure.delete(`/employee/${_id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hrEmployee", user?.email],
      });
      Swal.fire({
        title: "Deleted!",
        text: "Employee has been removed successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete employee. Please try again.",
        icon: "error",
      });
    },
  });

  // 🔍 Search filter
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.employeeName?.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeEmail?.toLowerCase().includes(search.toLowerCase()) ||
      emp.companyName?.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredEmployees, ',,,,,,,')

  const handleRemove = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployeeMutation.mutate(_id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading employees...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* 🔹 Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <FaUsers className="text-2xl text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-600">
            My Employee List
          </h2>
          <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {filteredEmployees.length} Total
          </span>
        </div>

        {/* 🔍 Search */}
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* 🔹 Info */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredEmployees.length} of {employees.length} employees
        {search && ` for "${search}"`}
      </p>

      {/* 🔹 Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-700">
              <th className="py-3 px-4 font-medium">Employee</th>
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium text-center">Assets</th>
              <th className="py-3 px-4 font-medium text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {/* 👤 Employee */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={emp.photo || "https://i.ibb.co/7G5fZK1/user.png"}
                        alt={emp.employeeName}
                        className="w-12 h-12 rounded-full object-cover border"
                        onError={(e) => {
                          e.target.src = "https://i.ibb.co/7G5fZK1/user.png";
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {emp.employeeName}
                      </p>
                      <p className="text-gray-500 text-xs">{emp.employeeEmail}</p>
                      <p className="text-gray-400 text-xs">
                        Joined: {new Date(emp.affiliationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </td>

                {/* 🏢 Company */}
                <td className="py-4 px-4">
                  <p className="font-medium text-gray-800">{emp.companyName}</p>
                  <span
                    className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : emp.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                {/* 📦 Assets */}
                <td className="py-4 px-4 text-center">
                  <span className="inline-block border px-3 py-1 rounded-lg text-sm bg-gray-50">
                    {emp.assets || 0}
                  </span>
                </td>

                {/* ❌ Action */}
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => handleRemove(emp._id)}
                    disabled={deleteEmployeeMutation.isPending}
                    className="flex items-center justify-center gap-2 mx-auto text-red-500 border border-red-300 px-4 py-2 rounded-lg text-sm hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash className="text-sm" />
                    {deleteEmployeeMutation.isPending ? "Removing..." : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">👤</div>
            <p className="text-gray-500 text-lg">No employees found</p>
            {search && (
              <p className="text-gray-400 text-sm mt-2">
                Try searching with different keywords
              </p>
            )}
          </div>
        )}
      </div>

      {/* 🔹 Footer Info */}
      <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span>HR: {user?.email}</span>
      </div>
    </div>
  );
};

export default HrEmployeeList;