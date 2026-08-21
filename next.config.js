/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/httpsaiabedirai-dashboard-business-growth-ahvaz",
        destination: "/blog/ai-dashboard-business-growth-ahvaz",
        permanent: true,
      },
      {
        source: "/blog/httpsaiabedirai-pr-innovation-business-growth-ahvaz",
        destination: "/blog/ai-pr-innovation-business-growth-ahvaz",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;