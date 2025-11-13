import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

// Bundle Analyzer para identificar dependencias pesadas
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  // Optimizaciones experimentales para CSS y rendimiento
  experimental: {
    optimizePackageImports: [
      'react-phone-number-input',
      'react-tabs',
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'framer-motion',
      'recharts',
      'swiper',
    ],
    // Mejora la compilación de CSS - reduce la cantidad de archivos CSS generados
    // y optimiza la carga para reducir la cadena de solicitudes críticas
    optimizeCss: true,
  },
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
    qualities: [75, 85, 90, 100], // Calidades permitidas (85 es el valor óptimo que usamos)
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
  // Headers para optimización de caching y seguridad
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Redirects para URLs antiguas
  async redirects() {
    return [
      {
        source: '/aboutus',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/project/nido-de-agua',
        destination: '/nido-de-agua',
        permanent: true,
      },
      {
        source: '/nido',
        destination: '/nido-de-agua',
        permanent: true,
      },
      {
        source: '/project/indie-universe',
        destination: '/indie-universe',
        permanent: true,
      },
      {
        source: '/indie',
        destination: '/indie-universe',
        permanent: true,
      },
      {
        source: '/discover-your-investor-profile',
        destination: 'https://dashboard.lokl.life/discover-your-investor-profile',
        permanent: true,
      },
      {
        source: '/cdt-vs-real-estate-investing',
        destination: 'https://dashboard.lokl.life/cdt-vs-real-estate-investing',
        permanent: true,
      },
      {
        source: '/real-estate-investment-simulator',
        destination: 'https://dashboard.lokl.life/real-estate-investment-simulator',
        permanent: true,
      },
      {
        source: '/investment-for-freelancers',
        destination: 'https://dashboard.lokl.life/investment-for-freelancers',
        permanent: true,
      },
      {
        source: '/digital-nomad',
        destination: 'https://dashboard.lokl.life/digital-nomad',
        permanent: true,
      },
      {
        source: '/landing/financial-freedom-simulator',
        destination: 'https://dashboard.lokl.life/landing/financial-freedom-simulator',
        permanent: true,
      },
    ];
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
