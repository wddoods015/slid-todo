/** @type {import('next').NextConfig} */
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
  productionBrowserSourceMaps: true, // 소스맵 생성 활성화
};

module.exports = nextConfig;
