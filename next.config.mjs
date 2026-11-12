/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Portfolio media is pasted as arbitrary external URLs, so remote hosts vary per project.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    unoptimized: true,
  },
};

export default nextConfig;
