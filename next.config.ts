import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com', 
      'lokl-files-upload-bucket.s3.amazonaws.com',
      'img.freepik.com',
      'teranarq.com',
      'realestatemarket.com.mx',
      'www.munich-business-school.de',
      'media.istockphoto.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
    ],
  },
  eslint: {
    // Desactivar verificación de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
