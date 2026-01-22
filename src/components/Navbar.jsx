import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const BACKEND = "https://url-shortner-backend-fpm3.onrender.com";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  // ✅ Check Auth
  const checkAuth = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/user/me`, {
        method: "GET",
        credentials: "include",
      });

      setIsAuth(res.ok);
    } catch (err) {
      setIsAuth(false);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuth(false);
        setOpen(false);
        navigate("/login");
      } else {
        alert("Logout failed ❌");
      }
    } catch (error) {
      alert("Server error ❌");
    }
  };

  // ✅ Nav links based on auth
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },

    // ✅ Not logged in only
    ...(!isAuth
      ? [
          { name: "Register", path: "/register" },
          { name: "Login", path: "/login" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✅ LEFT: Logo + Name */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white font-extrabold text-lg">
            🔗
          </div>
          <h1 className="text-xl font-extrabold text-gray-900">URL Shortner</h1>
        </Link>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-gray-700">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-green-600 transition ${
                  isActive ? "text-green-600 font-extrabold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* ✅ Desktop Logout */}
          {!loadingAuth && isAuth && (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* ✅ Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
        >
          {open ? "✖" : "☰"}
        </button>
      </nav>

      {/* ✅ Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm px-4 py-4 space-y-3">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl font-semibold transition ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* ✅ Mobile Logout */}
          {!loadingAuth && isAuth && (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
