import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../Hook/UseAxios";
import { FaCheck } from "react-icons/fa";
import UseAuth from "../../../../Hook/UseAuth";
import { useNavigate } from "react-router";

const UpgradePackage = () => {
  const axiosSecure = UseAxios();
  let navigate = useNavigate()
  let { user } = UseAuth();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  // upgrade 
  let {data: subscription = []} = useQuery({
    queryKey:  ['subscription'], 
    queryFn: async ()=>{
      let res = await axiosSecure.get(`http://localhost:3000/user/${user?.email}`)
      return res.data
    }
  })
  console.log(subscription, 'my subscriton')



  if (isLoading) {
    return <p className="text-center mt-10">Loading packages...</p>;
  }
  let hanglePayment = async (pkg) => {
    const paymentinformation = {
      packageId: pkg._id,
      packageName: pkg.name,
      amount: pkg.price, // ডলার
      employeeLimit: pkg.employeeLimit,
      hrEmail: user.email,
    };

    let res = await axiosSecure.post("/create-checkout-session",paymentinformation);
    
    console.log(res.data, 'resdata')
    window.location.href = res.data.url
    
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          Simple & Transparent <span className="text-teal-500">Pricing</span>
        </h2>

        <p className="text-gray-500 mt-3">
          Choose the perfect plan based on your company size. No hidden costs.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => {
          const isPopular = pkg.name === "Premium";

          return (
            <div
              key={pkg._id}
              className={`relative bg-white rounded-2xl p-8 text-center transition
              ${isPopular ? "border-2 border-teal-500 shadow-lg" : "shadow"}`}
            >
              {/* Most Popular badge */}
              {isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-sm px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold mb-4">{pkg.name}</h3>

              <h2 className="text-5xl font-bold">
                ${pkg.price}{" "}
                <span className="text-sm text-gray-500">/ month</span>
              </h2>

              <p className="text-gray-500 mt-3">
                Up to {pkg.employeeLimit} employees
              </p>

              <ul className="mt-8 space-y-4 text-left">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheck className="text-purple-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  hanglePayment(pkg);
                }}
                className={`mt-8 w-full py-3 rounded-lg font-medium transition
                ${
                  isPopular
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "border border-teal-500 text-teal-600 hover:bg-teal-50"
                }`}
              >
                {
                  subscription.subscription === pkg.name? <p>Current plan</p> : <p>Chose</p>
                }
                
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePackage;
