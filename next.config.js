/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    server_url: process.env.SERVER_URL,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
};

/*module.exports = {
    exportTrailingSlash: true,
}*/
module.exports = nextConfig;
