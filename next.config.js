/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactStrictMode: true,
  // This is the property you need to add
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
}

// module.exports = {
//   compiler: {
//     // Enables the styled-components SWC transform
//     styledComponents: true
//   }
// }

module.exports = nextConfig


