/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable strict typed routes so router.push('/path') compiles cleanly.
    typedRoutes: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
