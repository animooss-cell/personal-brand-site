import Image from "next/image";
import Link from "next/link";
import { PostListItem } from "@/lib/data";

export default function BlogPostCard({
  post,
  priority = false,
}: {
  post: PostListItem;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="fade-in-up flex cursor-pointer flex-col rounded-3xl border border-gray-200 bg-white p-7 text-right shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      {post.featured_image && (
        <div className="relative mb-4 h-36 w-full overflow-hidden rounded-2xl">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      {post.category && (
        <span className="mb-4 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
          {post.category}
        </span>
      )}
      <h3 className="mb-3 text-lg font-bold leading-7 text-slate-900 dark:text-white">{post.title}</h3>
      <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
      {post.published_at && (
        <time className="mt-auto text-xs text-slate-400">
          {new Date(post.published_at).toLocaleDateString("fa-IR")}
        </time>
      )}
    </Link>
  );
}
