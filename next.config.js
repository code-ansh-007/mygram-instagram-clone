/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "lh3.googleusercontent.com",
      "static.vecteezy.com",
      "firebasestorage.googleapis.com",
    ],
  },
};
