import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  devIndicators: {
    buildActivity: true,
  },
};

export default nextConfig;
