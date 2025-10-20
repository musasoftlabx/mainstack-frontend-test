import type { NextConfig } from "next";
import dayjs from "dayjs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  output: "export",
  generateBuildId: async () => `${dayjs().format("DDMMYYYY-HH")}`,
};

export default nextConfig;
