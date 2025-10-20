import type { NextConfig } from "next";
import dayjs from "dayjs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  generateBuildId: async () => `${dayjs().format("DDMMYYYY-HH")}`,
};

export default nextConfig;
