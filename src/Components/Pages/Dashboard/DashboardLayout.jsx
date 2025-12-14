import React from "react";
import { Outlet, NavLink, Link } from "react-router";
import { HiOutlineHome } from "react-icons/hi";
import { MdInventory, MdInventory2, MdSettings } from "react-icons/md";
import UseAuth from "../../../Hook/UseAuth";
import UseRole from "../../../Hook/UseRole";
import { FiPackage, FiPlusSquare } from "react-icons/fi";

const DashboardLayout = () => {
    let {user} = UseAuth()
    console.log(user)
    let {role} = UseRole()
    console.log(role)
  return (
    <div className="drawer container mx-auto lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content">
        {/* NAVBAR */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <div className="px-4 font-semibold">AssetVerse Dashboard</div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-6">
            
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <HiOutlineHome className="text-lg" />
                <span className="is-drawer-close:hidden ml-2">Homepage</span>
              </NavLink>
            </li>

            {/* Asset List */}
            <li>
              {/* <NavLink
                to="/dashboard/assets"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Assets"
              >
                <MdInventory className="text-lg" />
                <span className="is-drawer-close:hidden ml-2">
                  Asset List
                </span>
              </NavLink> */}

              {
                role === "hr" ?
                <>
             {/* {  asset list} */}
                 <NavLink
                to="/dashboard/assets-list"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Assets"
              >
                <MdInventory className="text-lg" />
                <span className="is-drawer-close:hidden ml-2">
                  Asset List
                </span>
              </NavLink> 
             {/* {  asset list} */}
                 <NavLink
                to="/dashboard/add-assets"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Assets"
              >
                <FiPlusSquare className="text-lg" />
                <span className="is-drawer-close:hidden ml-2">
                  Add Assets
                </span>
              </NavLink> 

              </>
                 :

               
                

                ( <>
                <NavLink
                to="/dashboard/my-assets"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Assets"
              >
                <MdInventory2 className="text-lg" />
                <span className="is-drawer-close:hidden ml-2">
                 My Assets  
                </span>
              </NavLink> 
                <NavLink
                to="/dashboard/requestAnassets"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Request an assets"
              >
                <FiPackage className="text-lg" />
                <span className="is-drawer-close:hidden ml-2">
                 Request an assets  
                </span>
              </NavLink> 
              </> 
             )

              }
            </li>

            {/* Settings */}
            <li>
              <NavLink
                to="/dashboard/settings"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <MdSettings className="text-lg" />
                <span className="is-drawer-close:hidden ml-2">
                  Settings
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
