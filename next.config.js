/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // API 엔드포인트 경로
        // destination: "http://localhost:8080/:path*",
        destination: "https://ohlcv-api.nomadcoders.workers.dev/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
