/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "storage.googleapis.com",
      "https://placehold.jp",
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
