/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.zyrosite.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
