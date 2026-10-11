import Image from "next/image";
import Link from "next/link";
import { PostListItem } from "@/lib/data";
import { BLOG_CATEGORIES } from "@/lib/categories";

export default function BlogPostCard({
  post,
  priority = false,
}: {
  post: PostListItem;
  priority?: boolean;
}) {
  const category = post.category ? BLOG_CATEGORIES.find((c) => c.value === post.category) : null;

  return (
    <article className="fade-in-up flex flex-col rounded-3xl border border-gray-200 bg-white p-7 text-right shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      {post.featured_image && (
        <Link
          href={`/blog/${post.slug}`}
          className="relative mb-4 block h-36 w-full cursor-pointer overflow-hidden rounded-2xl"
        >
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </Link>
      )}
      {post.category &&
        (category ? (
          <Link
            href={`/blog/category/${category.slug}`}
            className="mb-4 inline-block w-fit cursor-pointer rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 transition-colors duration-200 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-300 dark:hover:bg-brand-900/50"
          >
            {category.label}
          </Link>
        ) : (
          <span className="mb-4 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            {post.category}
          </span>
        ))}
      <Link href={`/blog/${post.slug}`} className="cursor-pointer">
        <h3 className="mb-3 text-lg font-bold leading-7 text-slate-900 dark:text-white">{post.title}</h3>
        <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
      </Link>
      {post.published_at && (
        <time className="mt-auto text-xs text-slate-400">
          {new Date(post.published_at).toLocaleDateString("fa-IR")}
        </time>
      )}
    </article>
  );
}
