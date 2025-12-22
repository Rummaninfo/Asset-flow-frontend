import UseAuth from "../../../Hook/UseAuth";
import UseRole from "../../../Hook/UseRole";
import Forbidden from "../../Forbidden ";



const EmployeePrivate = ({ children }) => {
  const { loading } = UseAuth();
  const { isLoading, role } = UseRole();

  if (loading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (role !== "employee") {
    return <Forbidden />;
  }

  return children;
};

export default EmployeePrivate;
