import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `https://url-shortner-backend-fpm3.onrender.com/api/user/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold text-gray-700">Checking login...</p>
      </div>
    );
  }

  // ✅ Not logged in -> login page
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in -> render nested routes
  return <Outlet />;
};

export default ProtectedLayout;
