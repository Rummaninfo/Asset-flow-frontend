import React from "react";
import { Link, NavLink, Outlet } from "react-router"; // note: react-router-dom

const Register = () => {
  const inactive = "text-[#64748B] font-bold text-2xl";
  const active = "text-[#0F172A] font-bold text-2xl underline decoration-2 decoration-[#0D9488]";

  return (
    <div className="px-4">
      <div className="flex gap-4 items-center mt-20">
        {/* use NavLink so active styling works */}
        <NavLink to="employee" end className={({ isActive }) => (isActive ? active : inactive)}>
          Join as Employee
        </NavLink>

        <span className="text-slate-300">||</span>

        {/* if you later add HR child route, change this to NavLink to="hr" */}
        <Link to="/register/hr" className="text-[#64748B] font-bold text-2xl">
          Register as HR
        </Link>
      </div>

      {/* area where child routes render */}
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Register;
