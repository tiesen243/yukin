/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./env.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async rewrites() {
    return [
      { source: '/api/mangadex/:path*', destination: 'https://api.mangadex.org/:path*' },
      { source: '/api/covers/:path*', destination: 'https://uploads.mangadex.org/covers/:path*' },
    ]
  },
}

export default nextConfig
