import { getPostBySlug, getPublishedCourses } from "@/lib/data";
import { NEWS_CATEGORY, BLOG_ARTICLE_CATEGORIES } from "@/lib/categories";
import { normalizeContentLinks } from "@/lib/post-content";
import { htmlToMarkdown, mdHeading, mdJoin, mdLink } from "@/lib/markdown";
import { homeMarkdown } from "@/lib/home";
import { aboutMarkdown, getAboutPageData } from "@/lib/about";
import { aiBusinessConsultingMarkdown } from "@/lib/content/services/ai-business-consulting";
import { aiGrowthConsultingMarkdown } from "@/lib/content/services/ai-growth-consulting";
import { aiTrainingAhvazMarkdown } from "@/lib/content/services/ai-training-ahvaz";
import { aiContentGenerationMarkdown } from "@/lib/content/services/ai-content-generation";
import { corporateAiTrainingMarkdown } from "@/lib/content/services/corporate-ai-training";
import { caseStudiesHubMarkdown, caseStudyMarkdown, getCaseStudy } from "@/lib/case-studies";

import { normalizePath } from "@/lib/markdown-routes";

const SERVICE_MARKDOWN: Record<string, () => string> = {
  "ai-business-consulting": aiBusinessConsultingMarkdown,
  "ai-growth-consulting": aiGrowthConsultingMarkdown,
  "ai-content-generation": aiContentGenerationMarkdown,
  "corporate-ai-training": corporateAiTrainingMarkdown,
};

export type MarkdownResult = { markdown: string } | { redirect: string } | null;

export async function markdownForPath(pathname: string): Promise<MarkdownResult> {
  const path = normalizePath(pathname);
  if (path === "/") return { markdown: await homeMarkdown() };
  if (path === "/about") return { markdown: aboutMarkdown(await getAboutPageData()) };

  const service = path.match(/^\/services\/([^/]+)$/);
  if (service) {
    if (service[1] === "ai-training-ahvaz") return { markdown: aiTrainingAhvazMarkdown(await getPublishedCourses()) };
    const build = SERVICE_MARKDOWN[service[1]];
    return build ? { markdown: build() } : null;
  }

  if (path === "/case-studies") return { markdown: caseStudiesHubMarkdown() };
  const caseStudy = path.match(/^\/case-studies\/([^/]+)$/);
  if (caseStudy) {
    const c = getCaseStudy(caseStudy[1]);
    return c ? { markdown: caseStudyMarkdown(c) } : null;
  }

  const blog = path.match(/^\/blog\/([^/]+)$/);
  if (blog) {
    let slug = blog[1];
    try {
      slug = decodeURIComponent(slug);
    } catch {
      // اسلاگ از قبل دیکد شده است
    }
    const post = await getPostBySlug(slug);
    if (!post) return null;
    // همان رفتار صفحه‌ی HTML: خبرها زیر /news نمایش داده می‌شوند.
    if (post.category === NEWS_CATEGORY.value) return { redirect: `/news/${post.slug}` };
    const category = BLOG_ARTICLE_CATEGORIES.find((c) => c.value === post.category);
    return {
      markdown: mdJoin([
        mdHeading(1, post.title),
        [
          category ? `دسته: ${mdLink(category.label, `/blog/category/${category.slug}`)}` : "",
          post.published_at ? `تاریخ انتشار: ${new Date(post.published_at).toLocaleDateString("fa-IR")}` : "",
        ]
          .filter(Boolean)
          .join(" · "),
        post.excerpt && `> ${post.excerpt}`,
        htmlToMarkdown(normalizeContentLinks(post.content)),
      ]),
    };
  }
  return null;
}
