/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    // See: https://github.com/vercel/next.js/issues/55682
    serverMinification: false,
  },
};

module.exports = nextConfig;
