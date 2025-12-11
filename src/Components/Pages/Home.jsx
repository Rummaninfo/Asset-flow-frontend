import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import undraw from "../../assets/undraw_agreement_ftet.svg";

const Home = () => {
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
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            Flexible <span className="text-teal-600">Pricing</span> Plans
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Choose the perfect plan for your company size and needs
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Basic",
                employees: "5 employees",
                price: "$5",
                period: "/month",
                features: ["Asset Tracking", "Employee Management", "Basic Support", "Up to 5 employees"],
                color: "border-teal-100",
                button: "btn-outline btn-teal",
                popular: false
              },
              {
                name: "Standard",
                employees: "10 employees",
                price: "$8",
                period: "/month",
                features: ["All Basic features", "Advanced Analytics", "Priority Support", "Up to 10 employees"],
                color: "border-teal-500 border-2",
                button: "btn-primary bg-gradient-to-r from-teal-500 to-cyan-500 border-0",
                popular: true
              },
              {
                name: "Premium",
                employees: "20 employees",
                price: "$15",
                period: "/month",
                features: ["All Standard features", "Custom Branding", "24/7 Support", "Up to 20 employees"],
                color: "border-purple-200",
                button: "btn-outline btn-purple",
                popular: false
              }
            ].map((pkg, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                whileHover={{ scale: pkg.popular ? 1.05 : 1.02 }}
                className={`relative rounded-2xl bg-white shadow-xl ${pkg.color} ${pkg.popular ? 'shadow-2xl scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800">{pkg.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                    <span className="text-gray-600 ml-2">{pkg.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{pkg.employees}</p>
                  
                  <ul className="mt-6 space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link 
                      to="/register-hr" 
                      className={`btn btn-lg w-full ${pkg.button} hover:shadow-lg transition-all duration-300`}
                    >
                      Choose {pkg.name}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
