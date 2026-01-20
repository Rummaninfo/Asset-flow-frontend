import React from "react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600">
            Have questions about AssetFlow? Reach out to our team and we’ll get
            back to you as soon as possible.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Get in Touch
            </h2>

            <p className="text-gray-600">
              Our support team is available to help you with onboarding,
              technical issues, and general inquiries.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600">support@assetflow.com</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>

              <div>
                <p className="font-medium text-gray-800">Office</p>
                <p className="text-gray-600">
                  245 Market Street, San Francisco, CA
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 py-3 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
