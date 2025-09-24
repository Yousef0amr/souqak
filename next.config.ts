import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // to ignore ts & eslint errors in build -> to test in local -> don't active them 👍
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

const withNextIntl = createNextIntlPlugin("./src/config/i18n/request.ts");
export default withNextIntl(nextConfig);
