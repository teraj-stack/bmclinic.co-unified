import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  output: 'standalone',

  // No floating Next.js "N" badge when there are zero issues (was mistaken for an error)
  devIndicators: false,

  // Dev: allow both localhost and 127.0.0.1 without Next.js cross-origin warnings
  allowedDevOrigins: ['127.0.0.1', 'localhost'],

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/bmclinic-home.html',
        },
      ],
      afterFiles: [
        {
          source: '/api/ai/:path*',
          destination: 'http://127.0.0.1:3002/api/ai/:path*',
        },
        {
          source: '/api/security/:path*',
          destination: 'http://127.0.0.1:3002/api/security/:path*',
        },
      ],
      fallback: [
        {
          source: '/mcml',
          destination: '/mcml/index.html',
        },
        {
          source: '/mcml/:path*',
          destination: '/mcml/index.html',
        },
      ],
    };
  },

  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          isProd
            ? { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
            : {
                key: 'Content-Security-Policy',
                value:
                  "frame-ancestors 'self' http://localhost:3500 http://127.0.0.1:3500 http://localhost:8765 http://127.0.0.1:8765 http://localhost:8768 http://127.0.0.1:8768 http://localhost:8766 http://127.0.0.1:8766",
              },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
