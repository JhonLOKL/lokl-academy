import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

// Bundle Analyzer para identificar dependencias pesadas
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lokl-files-upload-bucket.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'teranarq.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'realestatemarket.com.mx',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.munich-business-school.de',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lokl-academy.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lokl-academy.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lokl-assets.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lokl-assets.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
    // Optimizaciones de imágenes
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 año
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimizaciones de producción
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Desactivar verificación de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
};

export default withBundleAnalyzer(nextConfig);
