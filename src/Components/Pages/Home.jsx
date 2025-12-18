import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import undraw from "../../assets/undraw_agreement_ftet.svg";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hook/UseAxios";

const Home = () => {
  let axiosSecure = UseAxios()
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

     let {data: packages = []} =useQuery({
     queryKey: ["packages"],
     queryFn: async()=>{
      let res =  await axiosSecure.get("/packages")
      return res.data

     }
     })
     console.log(packages, 'all packatge')

  return (
    <main className="bg-gradient-to-b from-teal-50 via-white to-slate-50">
      {/* HERO SECTION */}
      <section className="py-16 md:py-24 px-4">
        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gray-900">Effortless </span>
              <span className="text-teal-600">Asset Management</span>
              <span className="text-gray-900"> for Modern Companies</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg text-gray-600 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Track, assign, and control company assets — laptops, chairs, accessories — with a clean HR-friendly workflow.
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/register-employee" 
                className="btn btn-primary btn-lg px-8 bg-gradient-to-r from-teal-500 to-cyan-500 border-0 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join as Employee
              </Link>
              <Link 
                to="/register-hr" 
                className="btn btn-outline btn-lg px-8 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 hover:border-teal-600 hover:text-teal-700 transition-all duration-300"
              >
                Register as HR
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-200 rounded-full opacity-30"
                animate={{ 
                  scale: [1, 1.12, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-200 rounded-full opacity-30"
                animate={{ 
                  scale: [1, 1.16, 1],
                  rotate: [0, -90, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <img 
                src={undraw} 
                alt="Asset Management Illustration" 
                className="relative z-10 w-full h-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <motion.section 
        className="py-12 bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { number: "100+", label: "Companies" },
              { number: "10K+", label: "Assets Managed" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-teal-600">AssetVerse</span>?
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Prevent Asset Loss",
                desc: "Clear tracking and accountability for all physical assets.",
                color: "from-teal-400 to-emerald-300",
                icon: "🔒"
              },
              {
                title: "Request & Approval Workflow",
                desc: "Employees request — HR approves — asset assigned.",
                color: "from-cyan-400 to-teal-300",
                icon: "📋"
              },
              {
                title: "Multi-company Support",
                desc: "Employees can be affiliated to multiple companies simultaneously.",
                color: "from-purple-300 to-pink-200",
                icon: "🏢"
              },
              {
                title: "Real-time Analytics",
                desc: "Interactive charts and reports for data-driven decisions.",
                color: "from-orange-200 to-yellow-200",
                icon: "📊"
              },
              {
                title: "Automated Notifications",
                desc: "Get alerts for approvals, returns, and deadlines.",
                color: "from-rose-200 to-pink-200",
                icon: "🔔"
              },
              {
                title: "Secure & Scalable",
                desc: "Enterprise-grade security with unlimited scaling.",
                color: "from-indigo-300 to-sky-200",
                icon: "🛡️"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="card bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body p-6">
                  <div className={`text-4xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      {/* PACKAGES SECTION */}
<section className="py-20 bg-gradient-to-b from-slate-50 to-white px-4">
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <motion.h2
      className="text-3xl md:text-4xl font-bold text-center text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Simple & Transparent{" "}
      <span className="text-teal-600">Pricing</span>
    </motion.h2>

    <motion.p
      className="text-center text-gray-600 mt-4 mb-14 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Choose the perfect plan based on your company size. No hidden costs.
    </motion.p>

    {/* Packages Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {packages.map((pkg, index) => {
        const isPopular = pkg.name === "Standard";

        return (
          <motion.div
            key={pkg._id || index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: isPopular ? 1.05 : 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`relative rounded-2xl bg-white border shadow-lg p-8 flex flex-col
              ${isPopular ? "border-teal-500 shadow-2xl" : "border-gray-200"}
            `}
          >
            {/* Popular Badge */}
            {isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            )}

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              {pkg.name}
            </h3>

            {/* Price */}
            <div className="text-center mt-6">
              <span className="text-5xl font-extrabold text-gray-900">
                ${pkg.price}
              </span>
              <span className="text-gray-500 text-sm ml-1">/ month</span>
            </div>

            {/* Employee limit */}
            <p className="text-center text-gray-600 mt-3">
              Up to{" "}
              <span className="font-semibold">
                {pkg.employeeLimit}
              </span>{" "}
              employees
            </p>

            {/* Features */}
            <ul className="mt-8 space-y-4 flex-1">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="text-emerald-500 mt-1">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <Link
              to="/register-hr"
              className={`mt-8 btn w-full text-lg
                ${
                  isPopular
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 hover:from-teal-600 hover:to-cyan-600"
                    : "btn-outline border-teal-500 text-teal-600 hover:bg-teal-50"
                }
              `}
            >
              Choose {pkg.name}
            </Link>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


      {/* HOW IT WORKS */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            How It <span className="text-teal-600">Works</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Register",
                desc: "HR or Employee creates an account in seconds.",
                icon: "👤"
              },
              {
                step: "2",
                title: "Request / Add",
                desc: "HR adds assets, employees request them easily.",
                icon: "📦"
              },
              {
                step: "3",
                title: "Approve & Assign",
                desc: "HR approves; assets get assigned automatically.",
                icon: "✅"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative z-10">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-full text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-3/4 w-full h-1 bg-gradient-to-r from-teal-300 to-teal-100 -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <motion.section 
        className="py-16 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ready to Streamline Your Asset Management?
          </motion.h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using AssetVerse to manage their assets efficiently.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/register-hr" 
              className="btn btn-lg px-10 bg-white text-teal-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/contact" 
              className="btn btn-lg px-10 btn-outline border-2 border-white text-white hover:bg-white hover:text-teal-600 hover:scale-105 transition-all duration-300"
            >
              Book a Demo
            </Link>
          </motion.div>
          <p className="mt-6 text-sm opacity-80">No credit card required • 14-day free trial</p>
        </div>
      </motion.section>
    </main>
  );
};

export default Home;
