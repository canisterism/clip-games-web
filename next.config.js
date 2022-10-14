/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "storage.googleapis.com", "placeimg.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
