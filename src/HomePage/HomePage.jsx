import React, { useEffect, useState } from "react";

const BACKEND = "https://url-shortner-backend-fpm3.onrender.com";
// const BACKEND="http://localhost:3000"
const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [myUrls, setMyUrls] = useState([]);
  const [fetchingUrls, setFetchingUrls] = useState(true);

  // ✅ Fetch user urls (displayUrl)
  const fetchMyUrls = async () => {
    try {
      setFetchingUrls(true);

      const res = await fetch(`${BACKEND}/api/user/me`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        setMyUrls(result?.data || []);
      } else {
        setMyUrls([]);
      }
    } catch (error) {
      setMyUrls([]);
    } finally {
      setFetchingUrls(false);
    }
  };

  useEffect(() => {
    fetchMyUrls();
  }, []);

  const handleShorten = async (e) => {
    e.preventDefault();

    if (!url) {
      alert("Please enter a URL!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result?.message || "Failed to create short URL ❌");
        return;
      }

      const shortCode = result?.data;
      const fullShortUrl = `${BACKEND}/api/user/${shortCode}`; // ✅ your route

      setShortUrl(fullShortUrl);
      setUrl("");

      // ✅ refresh list
      fetchMyUrls();
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied ✅");
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* ✅ HERO */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-bold text-sm border border-green-200">
            🔗 Fast & Secure URL Shortener
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Shorten Links, <span className="text-green-600">Share Faster</span>
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Create short and memorable links in seconds. Track clicks and manage
            your links easily.
          </p>
        </div>

        {/* ✅ URL FORM */}
        <form
          onSubmit={handleShorten}
          className="mt-10 max-w-3xl mx-auto bg-white border shadow-sm rounded-3xl p-4 flex flex-col md:flex-row gap-3"
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            placeholder="Enter your long URL..."
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {/* ✅ OUTPUT */}
        {shortUrl && (
          <div className="mt-6 max-w-3xl mx-auto bg-white border shadow-sm rounded-3xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-green-700 font-extrabold break-all hover:underline"
            >
              {shortUrl}
            </a>

            <button
              onClick={() => handleCopy(shortUrl)}
              className="px-5 py-2 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition"
            >
              Copy
            </button>
          </div>
        )}

        {/* ✅ MY URLS */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Your Created URLs
            </h2>

            <button
              onClick={fetchMyUrls}
              className="px-4 py-2 rounded-2xl bg-white border font-bold hover:bg-gray-100"
            >
              Refresh
            </button>
          </div>

          {fetchingUrls ? (
            <p className="mt-4 text-gray-600 font-bold">Loading urls...</p>
          ) : myUrls.length === 0 ? (
            <p className="mt-4 text-gray-600">
              You haven’t created any URLs yet.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4">
              {myUrls.map((item) => {
                const redirectLink = `${BACKEND}/api/user/${item.short_url}`;

                return (
                  <div
                    key={item._id}
                    className="bg-white border shadow-sm rounded-3xl p-5"
                  >
                    <p className="font-bold text-gray-900 break-all">
                      Original: {item.full_url}
                    </p>

                    <p className="mt-2 text-green-700 font-extrabold break-all">
                      Short: {redirectLink}
                    </p>

                    {/* ✅ Clicks */}
                    <p className="mt-2 text-gray-700 font-bold">
                      Clicks: <span className="text-green-600">{item.clicks}</span>
                    </p>

                    <div className="mt-4 flex gap-3 flex-wrap">
                      <a
                        href={redirectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition"
                      >
                        Open
                      </a>

                      <button
                        onClick={() => handleCopy(redirectLink)}
                        className="px-4 py-2 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
