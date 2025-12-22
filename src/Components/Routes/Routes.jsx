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
import MyTeam from "../Pages/Dashboard/Employee/MyTeam";
import EmployeeList from "../Pages/Dashboard/Hr/EmployeeList";
import HrProfile from "../Pages/Dashboard/Hr/HrProfile";
import UpgradePackage from "../Pages/Dashboard/Hr/UpgradePackage";
import PaymentSucess from "../Pages/Dashboard/Payments/PaymentSucess";
import PaymentCancel from "../Pages/Dashboard/Payments/PaymentCancel";
import EmployeProfile from "../Pages/Dashboard/Employee/EmployeProfile";
import Forbidden from "../Forbidden ";
import HrPrivate from "./Private/HrPrivate";
import Error from "../Pages/Error";
import EmployeePrivate from "./Private/EmployeePriavte";

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
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      // hr
      {
        path: "assets-list",
        element: <HrPrivate><AssetsList></AssetsList>,</HrPrivate>
      },
      {
        path: "add-assets",
        element: <HrPrivate><AddAsets></AddAsets>,</HrPrivate>
      },

      //  employee
      {
        path: "my-assets",
        element: <EmployeePrivate><MyAssets></MyAssets></EmployeePrivate>  // employe
      },
      {
        path: "requestAnassets",
        element: <EmployeePrivate><RequestAssests></RequestAssests></EmployeePrivate>   , // emplyee
      },
      {
        path: "allrequest",
        element: <HrPrivate><AllRequests></AllRequests>,</HrPrivate>
      },
      {
        path: "myteam",
        element: <EmployeePrivate><MyTeam></MyTeam></EmployeePrivate> // employee
      },
      {
        path: "employee-list",
        element: <HrPrivate><EmployeeList></EmployeeList></HrPrivate>
      },
      {
        path: "hr-profile",
        element: <HrPrivate><HrProfile></HrProfile>,</HrPrivate>
      },
      {
        path: "employeprofile",
        element: <EmployeePrivate><EmployeProfile></EmployeProfile></EmployeePrivate>, // employee
      },
      {
        path: "upgrade-package",
        element: (
          <HrPrivate>
            <UpgradePackage></UpgradePackage>
          </HrPrivate>
        ),
      },
      {
        path: "payment-success",
        element: <HrPrivate><PaymentSucess></PaymentSucess>,</HrPrivate>
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel></PaymentCancel>,
      },
      
    ],
  },
{
  path: "/forbidden",
  element: <Forbidden />
},
{
  path: "*",
  element: <Error></Error>
}

]);
