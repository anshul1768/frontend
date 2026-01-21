import React, { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();

    if (!url) {
      alert("Please enter a URL!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        credentials: "include", // ✅ if auth cookie required
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result?.message || "Failed to create short URL ❌");
        setLoading(false);
        return;
      }

      // ✅ because ApiResponse sends data in result.data
      const shortCode = result?.data; // nanoid(7)
      const fullShortUrl = `http://localhost:3000/api/redirect/${shortCode}`;

      setShortUrl(fullShortUrl);
      setUrl("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied ✅");
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* ✅ HERO */}
      <div className="max-w-7xl mx-auto px-4 py-16">
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
              onClick={handleCopy}
              className="px-5 py-2 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition"
            >
              Copy
            </button>
          </div>
        )}

        {/* ✅ FEATURES */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border shadow-sm rounded-3xl p-6">
            <h3 className="text-xl font-extrabold text-gray-900">⚡ Fast</h3>
            <p className="mt-2 text-gray-600">
              Generate short links instantly with quick response time.
            </p>
          </div>

          <div className="bg-white border shadow-sm rounded-3xl p-6">
            <h3 className="text-xl font-extrabold text-gray-900">🔒 Secure</h3>
            <p className="mt-2 text-gray-600">
              Your data stays safe with authentication and protected APIs.
            </p>
          </div>

          <div className="bg-white border shadow-sm rounded-3xl p-6">
            <h3 className="text-xl font-extrabold text-gray-900">📊 Analytics</h3>
            <p className="mt-2 text-gray-600">
              Track clicks and performance of your shortened URLs.
            </p>
          </div>
        </div>

        {/* ✅ CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-10 text-center shadow-lg">
          <h2 className="text-3xl font-extrabold">
            Ready to shorten your links?
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Create an account to manage your URLs and track analytics in one
            place.
          </p>
          <button className="mt-6 px-8 py-3 rounded-2xl bg-white text-green-700 font-extrabold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
