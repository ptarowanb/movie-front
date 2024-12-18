/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This will allow all domains
      },
      {
        protocol: 'http',
        hostname: '**', // This will allow all domains
      },
  
    ],
  },
}

module.exports = nextConfig