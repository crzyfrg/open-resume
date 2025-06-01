/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for better deployment
  output: 'standalone',
  
  // Configure webpack
  webpack: (config, { isServer }) => {
    // Ignore canvas and encoding modules as they're not needed on the client side
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    // Add fallback for Node.js modules that might be required by dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      module: false,
      // Add more Node.js core modules as needed
    };

    // Only configure for client-side
    if (!isServer) {
      // Use the PDF.js worker from CDN
      config.plugins.push(
        new (require('webpack').DefinePlugin)({
          'process.env.NEXT_PUBLIC_PDFJS_VERSION': JSON.stringify('3.11.174'),
        })
      );
    }

    return config;
  },
  
  // Configure images
  images: {
    domains: ['cdnjs.cloudflare.com'],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Configure TypeScript
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  
  // Configure ESLint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
