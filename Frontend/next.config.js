/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output: "standalone",
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
        destination: "http://api:80/api/:path*", // Proxy to Backend
      },
    ];
  },
  webpack: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
};

module.exports = nextConfig;
