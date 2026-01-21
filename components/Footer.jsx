import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Left: Logo + Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                🔗
              </div>
              <h2 className="text-xl font-extrabold">URL Shortner</h2>
            </Link>

            <p className="mt-3 text-white/70 max-w-md leading-relaxed">
              Shorten your long links instantly, track clicks, and manage all your
              URLs in one place.
            </p>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-white font-extrabold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/70 font-semibold">
                <li>
                  <Link to="/" className="hover:text-green-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-green-400 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-green-400 transition"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-green-400 transition">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-extrabold mb-4">Support</h3>
              <ul className="space-y-2 text-white/70 font-semibold">
                <li>
                  <a href="#help" className="hover:text-green-400 transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-green-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-green-400 transition">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-white/60 font-semibold">
          © {new Date().getFullYear()} URL Shortner. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
