/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "img2.joyreactor.cc",
        port: "",
        pathname: "/pics/post/**",
      },
    ],
  },
  rewrites() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:12571/api/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
