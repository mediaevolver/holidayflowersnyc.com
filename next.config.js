/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export when explicitly building for static deployment
  // For Vercel with admin features, we need server-side functionality
  ...(process.env.STATIC_EXPORT === 'true' && {
    output: 'export',
    trailingSlash: true,
  }),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig 