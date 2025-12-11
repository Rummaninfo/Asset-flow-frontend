import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import EmployeeForm from "../Pages/Form/EmployeeForm";
import HrForm from "../Pages/Form/HrForm";
import Login from "../Pages/Form/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
        children: [
          {
            path: "/register/employee",

            element: <EmployeeForm></EmployeeForm>,
          },
          {
            path: "/register/hr",
            index: true,
            element: <HrForm></HrForm>,
          },
          {
            path: "/register/login",
            index: true,
            element: <Login></Login>,
          },
        ],
      },
    ],
  },
]);
