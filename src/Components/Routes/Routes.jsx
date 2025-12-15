import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import EmployeeForm from "../Pages/Form/EmployeeForm";
import HrForm from "../Pages/Form/HrForm";
import Login from "../Pages/Form/Login";
import PrivateRoutes from "./Private/PrivatesRoutes";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";

import AssetsList from "../Pages/Dashboard/Hr/AssetsList";
import AddAsets from "../Pages/Dashboard/Hr/AddAsets";
import RequestAssests from "../Pages/Dashboard/Employee/RequestAssests";
import MyAssets from "../Pages/Dashboard/Employee/MyAssets";
import AllRequests from "../Pages/Dashboard/Hr/AllRequests";

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
            path: "employee",

            element: <EmployeeForm></EmployeeForm>,
          },
          {
            path: "hr",
            index: true,
            element: <HrForm></HrForm>,
          },
          {
            path: "login",
            index: true,
            element: <Login></Login>,
          },
        
        ],
      },
    ],
  },


  {
    path:"dashboard",
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      // hr
         {
          path: "assets-list", 
          element: <AssetsList></AssetsList>
         } ,
         {
          path: "add-assets", 
          element: <AddAsets></AddAsets>
         } ,


        //  employee
         {
          path: "my-assets", 
          element: <MyAssets></MyAssets>
         } ,
         {
          path: "requestAnassets", 
          element: <RequestAssests></RequestAssests>
         } ,
         {
          path: "allrequest", 
          element: <AllRequests></AllRequests>
         } ,
    ]
  }
]);
