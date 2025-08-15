/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

  // experimental: {
  //   typedRoutes: true,
  //   outputFileTracingIncludes: {
  //     "/posts/*": ["./src/app/posts/**/*.mdx"],
  //     "/travels/*": ["./src/app/travels/**/*.mdx"],
  //   },
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
