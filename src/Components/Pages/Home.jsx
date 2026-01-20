import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import undraw from "../../assets/undraw_agreement_ftet.svg";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hook/UseAxios";
import { FaCheck, FaArrowRight, FaStar, FaQuoteLeft } from "react-icons/fa";

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

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director, TechCorp",
      content: "AssetVerse reduced our asset tracking time by 70%. The approval workflow is seamless.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Michael Chen",
      role: "Operations Manager, StartUp Inc",
      content: "Finally a tool that understands multi-company asset management. Our team loves it!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      name: "Emma Wilson",
      role: "IT Administrator, Global Bank",
      content: "The analytics dashboard helped us identify $50K in underutilized assets.",
      rating: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      title: "5 Ways to Prevent Asset Loss in 2024",
      excerpt: "Learn modern strategies to track and secure company assets effectively.",
      category: "Best Practices",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h-250&fit=crop"
    },
    {
      title: "HR's Guide to Digital Asset Management",
      excerpt: "How HR teams can streamline asset allocation and approval workflows.",
      category: "HR Tools",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h-250&fit=crop"
    },
    {
      title: "Scaling Asset Management for Growth",
      excerpt: "Tips for managing assets across multiple teams and locations.",
      category: "Scaling",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h-250&fit=crop"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How does the approval workflow work?",
      answer: "Employees submit asset requests → HR reviews and approves → Asset assigned automatically → Notifications sent to both parties."
    },
    {
      question: "Can we use AssetVerse for multiple companies?",
      answer: "Yes! Our platform supports managing assets across multiple organizations with separate workspaces and permissions."
    },
    {
      question: "Is there a free trial?",
      answer: "Absolutely! All plans come with a 14-day free trial. No credit card required."
    },
    {
      question: "How secure is our data?",
      answer: "We use enterprise-grade encryption, SOC 2 compliance, and regular security audits to protect your data."
    }
  ];

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
                className="px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 transition shadow-lg hover:shadow-xl"
              >
                Join as Employee
              </Link>

              <Link
                to="/register-hr"
                className="px-8 py-4 rounded-xl border-2 border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 transition hover:shadow-lg"
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

      {/* ================= SERVICES ================= */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Complete Asset Management{" "}
              <span className="text-teal-600">Services</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              End-to-end solutions for tracking, allocating, and optimizing your company assets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Asset Tracking",
                desc: "Real-time GPS and status tracking for all assets",
                icon: "📱",
                features: ["Live location", "Status updates", "Audit trails"]
              },
              {
                title: "HR Workflow",
                desc: "Streamlined approval process for asset requests",
                icon: "👔",
                features: ["Auto-routing", "Approval chains", "Documentation"]
              },
              {
                title: "Analytics Suite",
                desc: "Comprehensive insights and reporting dashboard",
                icon: "📊",
                features: ["Usage reports", "Cost analysis", "Predictive insights"]
              },
              {
                title: "Support & Training",
                desc: "Dedicated onboarding and 24/7 support",
                icon: "🛟",
                features: ["Live training", "API access", "Priority support"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <FaCheck className="text-teal-500 text-xs" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
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

      {/* ================= USE CASES ================= */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
            >
              Perfect For <span className="text-teal-600">Your Industry</span>
            </motion.h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              AssetVerse adapts to your specific needs across various industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Tech Startups",
                desc: "Manage laptops, devices, and equipment for remote teams",
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: "Healthcare",
                desc: "Track medical equipment and ensure compliance",
                color: "from-emerald-500 to-teal-400"
              },
              {
                title: "Education",
                desc: "Allocate resources across departments and campuses",
                color: "from-purple-500 to-pink-400"
              },
              {
                title: "Manufacturing",
                desc: "Monitor tools, machinery, and inventory assets",
                color: "from-orange-500 to-amber-400"
              }
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`bg-gradient-to-br ${useCase.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                <p className="opacity-90">{useCase.desc}</p>
                <button className="mt-6 text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
                  Learn More →
                </button>
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

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
            >
              Trusted by <span className="text-teal-600">Industry Leaders</span>
            </motion.h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              See what companies are saying about their experience with AssetVerse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`text-amber-400 ${idx < testimonial.rating ? "fill-current" : "fill-gray-300"}`}
                    />
                  ))}
                </div>
                
                <FaQuoteLeft className="text-teal-400 text-2xl mb-4" />
                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG PREVIEW ================= */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Latest from <span className="text-teal-600">Our Blog</span>
              </h2>
              <p className="text-gray-600 mt-2">Insights on asset management best practices</p>
            </div>
            <Link
              to="/blog"
              className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
            >
              View All Articles <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-gradient-to-r from-teal-400 to-cyan-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-sm font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <button className="text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Frequently Asked <span className="text-teal-600">Questions</span>
            </h2>
            <p className="text-gray-600 mt-4">Get answers to common questions about AssetVerse</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
            >
              Contact our support team <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Streamline Asset Management?
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join companies already managing assets efficiently with AssetVerse.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/register-hr"
              className="px-10 py-4 rounded-xl bg-white text-teal-600 font-bold hover:scale-105 transition shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 rounded-xl border-2 border-white font-bold hover:bg-white hover:text-teal-600 transition hover:shadow-lg"
            >
              Book a Demo
            </Link>
          </div>

          <p className="mt-6 text-sm opacity-80">
            No credit card required • 14-day free trial
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;