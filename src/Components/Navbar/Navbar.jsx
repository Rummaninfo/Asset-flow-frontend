import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/asset-management.png";
import UseAuth from "../../Hook/UseAuth";

const Navbar = () => {
  let {user, logOutUser} = UseAuth()
  const activeClass = ({ isActive }) =>
    isActive
      ? "text-teal-600 font-semibold underline underline-offset-4 decoration-2"
      : "text-gray-700 hover:text-teal-600";

  const navItems = (
    <>

      <li>
        <NavLink to="/" end className={activeClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" end className={activeClass}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/helpsupport" end className={activeClass}>
          Help/Support
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/packages" className={activeClass}>
          Packages
        </NavLink>
      </li> */}
{/* 
      <li>
        <NavLink to="/about" className={activeClass}>
          About
        </NavLink>
      </li> */}

      {/* <li>
        <NavLink to="/contact" className={activeClass}>
          Contact
        </NavLink>
      </li> */}
      {user && (
      <>
      <li>
        <NavLink to="/blog" className={activeClass}>
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={activeClass}>
          Dashboard
        </NavLink>
      </li>
      
      </>
    )}
      
    </>
  );
   let handleOut = ()=>{
       logOutUser()
       .then(() => {
        alert("sign out successful");
      })
      .catch((er) => {
        console.log(er);
      });
   }

  return (
    <nav className="navbar sticky z-50 top-0  bg-white shadow-sm px-4 md:px-8">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Open navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
            role="menu"
            aria-label="Primary"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-900 flex items-center gap-2"
        >
          <img className="h-10" src={logo} alt="" />
          
        <span className="text-blue-300">  AssetFlow</span>
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-gray-700 gap-6">
          {navItems}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
       {
         user? 
         <Link to='/register'>
        
          <button onClick={handleOut} className="btn btn-sm bg-transparent border border-gray-200 hover:border-teal-200 text-gray-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200">
            Logout
          </button>
        </Link>
         :
       <>
        <Link to="/register/login">
          <button className="btn btn-sm bg-transparent border border-gray-200 hover:border-teal-200 text-gray-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="btn btn-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 hover:from-teal-600 hover:to-cyan-600 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300">
            Register
          </button>
        </Link>
        </>
       }
      </div>
    </nav>
  );
};

export default Navbar;
