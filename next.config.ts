import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.basicbuildersltd.com",
      },
      {
        protocol: "https",
        hostname: "basicbuildersltd.com",
      },
    ],
  },
};

export default nextConfig;
