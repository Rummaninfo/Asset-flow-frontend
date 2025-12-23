import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import undraw from "../../assets/undraw_agreement_ftet.svg";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hook/UseAxios";

const Home = () => {
  const axiosSecure = UseAxios();

  // animations
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* ================= HERO ================= */}
      <section className="py-20 px-4">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 max-w-xl">
              Effortless{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Asset Management
              </span>{" "}
              for Modern Companies
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
              Track, assign, and control company assets with a clean, secure,
              HR-friendly workflow built for growing teams.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register-employee"
                className="px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 transition shadow-lg"
              >
                Join as Employee
              </Link>

              <Link
                to="/register-hr"
                className="px-8 py-4 rounded-xl border-2 border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 transition"
              >
                Register as HR
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={undraw}
              alt="Asset Management"
              className="w-full max-w-lg drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-14 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center px-4">
          {[
            { num: "100+", label: "Companies" },
            { num: "10K+", label: "Assets Managed" },
            { num: "99.9%", label: "Uptime" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-extrabold">{s.num}</p>
              <p className="mt-2 text-lg opacity-90">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-teal-600">AssetVerse</span>?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              [
                "🔒",
                "Prevent Asset Loss",
                "Track every asset with accountability.",
              ],
              ["📋", "Approval Workflow", "Employees request, HR approves."],
              ["🏢", "Multi-company", "Work across multiple organizations."],
              ["📊", "Analytics", "Visual insights & reports."],
              ["🔔", "Notifications", "Never miss approvals or returns."],
              ["🛡️", "Secure & Scalable", "Enterprise-grade protection."],
            ].map(([icon, title, desc], i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 40px rgba(0,0,0,0.12)",
                }}
                className="bg-white/80 backdrop-blur rounded-2xl border border-gray-100 p-8 transition"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="mt-3 text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            Simple & <span className="text-teal-600">Transparent Pricing</span>
          </h2>

          <p className="text-center text-gray-600 mt-4 mb-14">
            Choose a plan that fits your company size.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages?.map((pkg) => {
              const popular = pkg.name === "Standard";

              return (
                <motion.div
                  key={pkg._id}
                  whileHover={{ scale: popular ? 1.05 : 1.03 }}
                  className={`relative rounded-3xl bg-white p-8 border shadow-lg flex flex-col ${
                    popular ? "border-teal-500 shadow-2xl" : "border-gray-200"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-2xl font-bold text-center">{pkg.name}</h3>

                  <div className="text-center mt-6">
                    <span className="text-5xl font-extrabold">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 text-sm"> / month</span>
                  </div>

                  <p className="text-center text-gray-600 mt-3">
                    Up to <b>{pkg.employeeLimit}</b> employees
                  </p>

                  <ul className="mt-8 space-y-3 flex-1">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex gap-3 text-gray-700">
                        <span className="text-emerald-500">✔</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register-hr"
                    className={`mt-8 w-full py-3 rounded-xl text-center font-semibold ${
                      popular
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                        : "border-2 border-teal-500 text-teal-600 hover:bg-teal-50"
                    }`}
                  >
                    Choose {pkg.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center px-4">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Streamline Asset Management?
        </h3>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Join companies already managing assets efficiently with AssetVerse.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/register-hr"
            className="px-10 py-4 rounded-xl bg-white text-teal-600 font-bold hover:scale-105 transition shadow-lg"
          >
            Start Free Trial
          </Link>
          <Link
            to="/contact"
            className="px-10 py-4 rounded-xl border-2 border-white font-bold hover:bg-white hover:text-teal-600 transition"
          >
            Book a Demo
          </Link>
        </div>

        <p className="mt-6 text-sm opacity-80">
          No credit card required • 14-day free trial
        </p>
      </section>
    </main>
  );
};

export default Home;
