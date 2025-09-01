import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'lokl-files-upload-bucket.s3.amazonaws.com'],
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
    ],
  },
  eslint: {
    // Desactivar verificación de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
