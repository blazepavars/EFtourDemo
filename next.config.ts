import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GA_TRACKING_ID: "G-XXXXXXXXXX", // Replace with your GA4 tracking ID
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript type checking during builds
  },
};

export default nextConfig;
