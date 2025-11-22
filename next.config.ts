import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qr.sepay.vn',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  devIndicators: {
    buildActivity: true,
  },
};

export default nextConfig;
