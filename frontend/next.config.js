/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "storage.googleapis.com",
      "placeimg.com",
      "images.unsplash.com",
    ],
  },
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
