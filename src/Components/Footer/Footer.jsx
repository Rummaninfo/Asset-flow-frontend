// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t">
      {/* outer padding + center the inner content with max width */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12">
        {/* responsive grid: 1 col on small, 2 on md, 4 on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="text-2xl font-bold">AssetVerse</Link>
            <p className="text-sm text-base-content opacity-80 max-w-sm">
              A modern asset management system for HR & Employees.
              Track, assign and manage company assets easily.
            </p>

            <div className="flex items-center gap-4 mt-3">
              {/* replace with proper icons or svg */}
              <a href="#" aria-label="facebook" className="text-lg hover:text-primary">Fb</a>
              <a href="#" aria-label="x/twitter" className="text-lg hover:text-primary">X</a>
              <a href="#" aria-label="linkedin" className="text-lg hover:text-primary">In</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-600 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/packages" className="link link-hover">Packages</Link></li>
              <li><Link to="/about" className="link link-hover">About</Link></li>
              <li><Link to="/contact" className="link link-hover">Contact</Link></li>
            </ul>
          </div>

          {/* Join Us */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-600 mb-3">Join Us</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register-employee" className="link link-hover">Join as Employee</Link></li>
              <li><Link to="/register-hr" className="link link-hover">Join as HR Manager</Link></li>
              <li><Link to="/login" className="link link-hover">Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-600 mb-3">Contact</h4>
            <p className="text-sm">Email: <a href="mailto:support@assetverse.com" className="link link-hover">support@assetverse.com</a></p>
            <p className="text-sm mt-1">Phone: <a href="tel:+12345678900" className="link link-hover">+1 234 567 8900</a></p>
            <p className="text-sm mt-4 opacity-80">© {new Date().getFullYear()} AssetVerse — All Rights Reserved</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
