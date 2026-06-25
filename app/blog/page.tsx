import { posts } from "@/lib/posts";

export const metadata = {
  title: "وبلاگ | مشاور کسب‌وکار هوش مصنوعی",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">وبلاگ</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          یادداشت‌هایی درباره هوش مصنوعی، استارتاپ و رشد کسب‌وکار.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {posts.map((post, idx) => (
          <article
            key={post.slug}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="fade-in-up rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {post.tag}
              </span>
              <time className="text-xs text-slate-400">{post.date}</time>
            </div>
            <h2 className="mb-3 text-xl font-bold leading-8 text-slate-900">{post.title}</h2>
            <p className="text-sm leading-7 text-slate-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
