import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/packages" 
          className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}
        >
          Packages
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/about" 
          className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md">

      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold btn btn-ghost">
          AssetVerse
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          {navItems}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        <Link to="/login">
          <button className="btn btn-sm">Login</button>
        </Link>

        <Link to="/register">
          <button className="btn btn-sm btn-primary">Register</button>
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
