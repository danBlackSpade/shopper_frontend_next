import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'maps.googleapis.com'],
  }

  // appDir: true
};

export default nextConfig;
