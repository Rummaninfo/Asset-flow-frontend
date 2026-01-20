import React from "react";

export default function HelpSupport() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Help & Support
          </h1>
          <p className="text-gray-600">
            Find quick answers to common questions or get in touch with our
            support team for personalized assistance.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Knowledge Base
            </h3>
            <p className="text-gray-600 mb-4">
              Browse detailed guides and documentation to get started quickly.
            </p>
            <button className="text-teal-600 font-medium hover:underline">
              View Articles
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Live Support
            </h3>
            <p className="text-gray-600 mb-4">
              Chat with our support team during business hours.
            </p>
            <button className="text-teal-600 font-medium hover:underline">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Email Support
            </h3>
            <p className="text-gray-600 mb-4">
              Send us an email and we’ll respond within 24 hours.
            </p>
            <button className="text-teal-600 font-medium hover:underline">
              Contact Support
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="cursor-pointer font-medium text-gray-800 flex justify-between items-center">
                How do I register an account?
                <span className="text-teal-500 group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                Click on the Register button in the top navigation and complete
                the sign-up form with your details.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="cursor-pointer font-medium text-gray-800 flex justify-between items-center">
                Can I manage assets for multiple teams?
                <span className="text-teal-500 group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, AssetFlow allows you to manage and assign assets across
                multiple departments and teams.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="cursor-pointer font-medium text-gray-800 flex justify-between items-center">
                How can I reset my password?
                <span className="text-teal-500 group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                Use the "Forgot Password" option on the login page to receive a
                password reset email.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="cursor-pointer font-medium text-gray-800 flex justify-between items-center">
                How do I contact support directly?
                <span className="text-teal-500 group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                You can reach our support team via live chat or email at
                support@assetflow.com.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
