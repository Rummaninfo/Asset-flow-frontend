import React from "react";
import { Outlet, NavLink } from "react-router";
import { HiOutlineHome, HiUser } from "react-icons/hi";
import {
  MdInventory,
  MdInventory2,
  MdPeopleAlt,
  MdSettings,
} from "react-icons/md";
import { FiPackage, FiPlusSquare } from "react-icons/fi";
import { FaCrow, FaUser } from "react-icons/fa";
import UseAuth from "../../../Hook/UseAuth";
import UseRole from "../../../Hook/UseRole";

const DashboardLayout = () => {
  const { user } = UseAuth();
  const { role } = UseRole();
  console.log(user, 'user')

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
          <div className="p-5 border-b flex items-center gap-4">
            {/* Profile Image */}
            <img
              src={user?.photoURL || "https://i.ibb.co/7G5fZK1/user.png"}
              alt="profile"
              className="w-14 h-14 rounded-full border-2 border-primary object-cover"
            />

            {/* Name, Email, Role */}
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-800">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>

              {/* Role Badge */}
              {role === "hr" && (
                <span
                  className="inline-block mt-1 text-[10px] font-semibold
                             bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full"
                >
                  HR
                </span>
              )}
            </div>
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

                <li>
                  <NavLink
                    to="/dashboard/employee-list"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <MdPeopleAlt className="text-lg" />
                    Employee List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/upgrade-package"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <FaCrow className="text-lg" />
                    Upgrade Package
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/hr-profile"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <FaUser className="text-lg" />
                    Profile
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

                <li>
                  <NavLink
                    to="/dashboard/myteam"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <HiUser className="text-lg" />
                    My Team
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/employeprofile"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "rounded-lg hover:bg-base-300"
                    }
                  >
                    <HiUser className="text-lg" />
                    Employe Profile
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
