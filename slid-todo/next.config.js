/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    esmExternals: "loose",
  },
  output: "standalone",
  productionBrowserSourceMaps: true,
};

module.exports = withBundleAnalyzer(nextConfig);
