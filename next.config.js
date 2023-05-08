/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This is the property you need to add
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
  }

}

module.exports = nextConfig


