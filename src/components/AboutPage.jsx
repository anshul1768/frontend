import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Heading */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-bold text-sm border border-green-200">
            ℹ️ About URL Shortner
          </p>

          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
            Simple, Fast & Secure Link Shortening
          </h1>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            URL Shortner is a web application that helps you convert long URLs into
            short and shareable links. It also allows you to track clicks and
            manage your shortened URLs easily.
          </p>
        </div>

        {/* Content */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="bg-white rounded-3xl border shadow-sm p-8">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Why we built this?
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Long links are difficult to share and look messy. With URL Shortner,
              you can create clean links that are easy to remember and share on
              social media, WhatsApp, and other platforms.
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Our goal is to provide a quick, secure, and user-friendly experience
              for anyone who needs link shortening.
            </p>
          </div>

          {/* Right */}
          <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 p-10 text-white shadow-lg">
            <h2 className="text-2xl font-extrabold">How it works 🔗</h2>

            <ul className="mt-5 space-y-4 font-semibold text-white/95">
              <li className="flex items-start gap-2">
                ✅ Enter a long URL in the input box
              </li>
              <li className="flex items-start gap-2">
                ✅ Click “Shorten URL”
              </li>
              <li className="flex items-start gap-2">
                ✅ Get a short and shareable link instantly
              </li>
              <li className="flex items-start gap-2">
                ✅ Track clicks and manage all links
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="px-6 py-3 rounded-2xl bg-white text-green-700 font-extrabold hover:bg-gray-100 transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 rounded-2xl bg-black/20 border border-white/20 text-white font-extrabold hover:bg-black/30 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Features ⭐
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border shadow-sm rounded-3xl p-6">
              <h3 className="text-lg font-extrabold text-gray-900">⚡ Fast</h3>
              <p className="mt-2 text-gray-600">
                Create short links instantly with fast API response.
              </p>
            </div>

            <div className="bg-white border shadow-sm rounded-3xl p-6">
              <h3 className="text-lg font-extrabold text-gray-900">🔒 Secure</h3>
              <p className="mt-2 text-gray-600">
                Secure cookies & authentication for user safety.
              </p>
            </div>

            <div className="bg-white border shadow-sm rounded-3xl p-6">
              <h3 className="text-lg font-extrabold text-gray-900">📊 Analytics</h3>
              <p className="mt-2 text-gray-600">
                Track clicks and monitor link performance.
              </p>
            </div>

            <div className="bg-white border shadow-sm rounded-3xl p-6">
              <h3 className="text-lg font-extrabold text-gray-900">🧩 Easy</h3>
              <p className="mt-2 text-gray-600">
                Clean UI and easy-to-use dashboard (future scope).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center text-gray-600 font-semibold">
          Made with ❤️ for fast and easy link sharing.
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
