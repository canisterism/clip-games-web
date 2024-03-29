/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "storage.googleapis.com",
      "placeimg.com",
      "images.unsplash.com",
      "lh4.googleusercontent.com",
      "m.media-amazon.com",
    ],
  },
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
