import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAxios from "../../../../Hook/UseAxios";
import UseAuth from "../../../../Hook/UseAuth";

const MyTeam = () => {
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const [selectedCompany, setSelectedCompany] = useState(null);

  // 🔹 Load companies
  const { data: companies = [] } = useQuery({
    queryKey: ["myCompanies", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-companies/${user.email}`
      );
      return res.data?.companies || [];
    },
  });
  console.log(companies, 'all companis')

  // 🔹 Load team members
  const { data: team = [], isLoading } = useQuery({
    queryKey: ["companyTeam", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/company-team/${selectedCompany}`
      );
      return res.data?.teamMembers || [];
    },
  });
  console.log(team, 'al team')

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      
      {/* 🏢 LEFT SIDE – COMPANY LIST */}
      <div className="col-span-4 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          My Companies
        </h2>

        {companies.map((company) => (
          <div
            key={company._id}
            onClick={() => setSelectedCompany(company.companyName)}
            className={`flex items-center gap-3 p-3 mb-2 rounded cursor-pointer
              ${
                selectedCompany === company.companyName
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
          >
            {/* 🖼 Company Photo */}
            <img
              src={
                company.companyLogo ||
                "https://i.ibb.co/2y7sZ3y/company.png"
              }
              alt="company"
              className="w-12 h-12 rounded-full object-cover"
            />
            

            {/* Company Name */}
            <div>
              <p className="font-medium">
                {company.companyName}
              </p>
              <p className="text-xs text-gray-500">
                {company.hrEmail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 👥 RIGHT SIDE – TEAM MEMBERS */}
      <div className="col-span-8 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Team Members
        </h2>

        {!selectedCompany && (
          <p className="text-gray-500">
            Select a company to view team members
          </p>
        )}

        {isLoading && <p>Loading team...</p>}

        {!isLoading && team.length === 0 && selectedCompany && (
          <p>No team members found</p>
        )}

        {team.map((member) => (
          <div
            key={member._id}
            className="flex items-center gap-4 border-b py-3"
          >
            {/* 👤 Employee Photo */}
            <img
              src={
                member.photo ||
                "https://i.ibb.co/7G5fZK1/user.png"
              }
              alt="employee"
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* Employee Info */}
            <div>
              <p className="font-medium">
                {member.employeeName}
              </p>
              <p className="text-sm text-gray-500">
                {member.employeeEmail}
              </p>
              <span className="text-xs text-green-600">
                {member?.employeeBirthDate || "not found"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
