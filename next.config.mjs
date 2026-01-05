/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false,
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // experimental: {
  //   typedRoutes: true,
  //   outputFileTracingIncludes: {
  //     "/posts/*": ["./src/app/posts/**/*.mdx"],
  //     "/travels/*": ["./src/app/travels/**/*.mdx"],
  //   },
  // },

  async rewrites() {
    return [
      {
        source: '/umami/:path*',
        destination: 'https://cloud.umami.is/:path*',
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
