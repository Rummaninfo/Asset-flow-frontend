import React from "react";
import { Outlet, NavLink } from "react-router";
import { HiOutlineHome } from "react-icons/hi";
import { MdInventory, MdInventory2, MdSettings } from "react-icons/md";
import { FiPackage, FiPlusSquare } from "react-icons/fi";
import UseAuth from "../../../Hook/UseAuth";
import UseRole from "../../../Hook/UseRole";

const DashboardLayout = () => {
  let { user } = UseAuth();
  let { role } = UseRole();

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* TOP NAVBAR */}
        <nav className="navbar bg-base-200 px-4 shadow-sm">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost lg:hidden"
          >
            ☰
          </label>
          <h1 className="text-lg font-semibold text-primary">
            AssetVerse Dashboard
          </h1>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-200 min-h-full border-r">
          {/* USER INFO */}
          <div className="p-5 border-b">
            <p className="font-semibold text-sm">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* MENU */}
          <ul className="menu p-4 space-y-1">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white rounded-lg"
                    : "rounded-lg hover:bg-base-300"
                }
              >
                <HiOutlineHome className="text-lg" />
                Homepage
              </NavLink>
            </li>

            {/* HR MENU */}
            {role === "hr" && (
              <>
                <li className="menu-title mt-4">
                  <span>HR Panel</span>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assets-list"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <MdInventory className="text-lg" />
                    Asset List
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-assets"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <FiPlusSquare className="text-lg" />
                    Add Assets
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/allrequest"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <FiPackage className="text-lg" />
                     All Request
                  </NavLink>
                </li>
              </>
            )}

            {/* EMPLOYEE MENU */}
            {role !== "hr" && (
              <>
                <li className="menu-title mt-4">
                  <span>Employee Panel</span>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-assets"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <MdInventory2 className="text-lg" />
                    My Assets
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/requestAnassets"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <FiPackage className="text-lg" />
                    Request Assets
                  </NavLink>
                </li>
                
              </>
            )}

            {/* SETTINGS */}
            <li className="menu-title mt-4">
              <span>General</span>
            </li>

            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white rounded-lg"
                    : "rounded-lg hover:bg-base-300"
                }
              >
                <MdSettings className="text-lg" />
                Settings
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
