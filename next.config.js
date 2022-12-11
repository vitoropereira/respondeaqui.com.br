/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.prismic.io",
      "i.ytimg.com",
      "portaldev2021.cdn.prismic.io",
      "avatars.githubusercontent.com",
      "ui-avatars.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
