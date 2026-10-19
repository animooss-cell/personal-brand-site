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
      // ادغام چند مقاله‌ی تکراری در مقاله‌های اصلی؛ نشانی‌های قدیمی با ۳۰۱ به
      // مقاله‌ی اصلی هدایت می‌شوند. این پست‌های قدیمی بعد از deploy از پنل
      // ادمین به حالت پیش‌نویس برده می‌شوند.
      {
        source: "/blog/no-code-ai-tools-business-ahvaz",
        destination: "/blog/ai-no-code-tools-selection-managers",
        permanent: true,
      },
      {
        source: "/blog/no-code-ai-tools-ahvaz-managers",
        destination: "/blog/ai-no-code-tools-selection-managers",
        permanent: true,
      },
      {
        source: "/blog/top-5-ai-tools-for-business-owners",
        destination: "/blog/best-ai-tools-ahvaz-khuzestan",
        permanent: true,
      },
      {
        source: "/blog/ai-accountants-ahvaz-tax-reports",
        destination: "/blog/ai-for-accountants-ahvaz",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;