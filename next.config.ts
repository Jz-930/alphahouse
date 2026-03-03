import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-author",
            value: "jiackey",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
