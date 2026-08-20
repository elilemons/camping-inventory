/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: process.env.NEXT_ALLOWED_DEV_ORIGIN
    ? [process.env.NEXT_ALLOWED_DEV_ORIGIN]
    : [],
}

export default nextConfig
