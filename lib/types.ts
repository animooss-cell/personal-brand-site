export type BlockType = "text" | "image" | "video" | "podcast" | "code" | "quote";

export type Block =
  | { id: string; type: "text"; data: { html: string } }
  | { id: string; type: "image"; data: { url: string; caption?: string } }
  | { id: string; type: "video"; data: { url: string } }
  | { id: string; type: "podcast"; data: { url: string } }
  | { id: string; type: "code"; data: { code: string; language?: string } }
  | { id: string; type: "quote"; data: { text: string; cite?: string } };

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  content: Block[];
  status: PostStatus;
  published_at: string | null;
  category: string | null;
  tags: string[];
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image: string | null;
  noindex: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceCard = {
  id: string;
  position: number;
  icon: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  audience: string[];
  steps: string[];
  featured: boolean;
};

export type CourseStatus = "draft" | "published";
export type CourseLevel = "مقدماتی" | "متوسط" | "پیشرفته" | "مقدماتی تا متوسط";

export type Course = {
  id: string;
  position: number;
  title: string;
  slug: string;
  audience: string | null;
  description: string | null;
  image: string | null;
  content: Block[];
  outline: string[];
  duration: string | null;
  level: string | null;
  status: CourseStatus;
};

export type ContactMessage = {
  id: string;
  name: string;
  business: string | null;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  site_title: string | null;
  site_description: string | null;
  brand_color: string | null;
  contact_email: string | null;
  social_links: Record<string, string>;

  hero_badge: string | null;
  hero_title_prefix: string | null;
  hero_title_highlight: string | null;
  hero_title_suffix: string | null;
  hero_description: string | null;
  hero_image: string | null;
  hero_primary_cta: string | null;
  hero_secondary_cta: string | null;
  hero_trust_text: string | null;

  avatar_image: string | null;
  full_name: string | null;
  role_title: string | null;

  about_badge: string | null;
  about_title_prefix: string | null;
  about_title_highlight: string | null;
  about_description: string | null;
  about_card_title: string | null;
  about_card_description: string | null;
  about_image: string | null;
  about_principles: string[];
  about_secondary_image: string | null;
  about_quote_title: string | null;
  about_quote_text: string | null;
};

export type AboutContent = {
  id: number;
  avatar_image: string | null;
  full_name: string | null;
  role_title: string | null;
  short_bio: string | null;
  full_bio: string | null;
  specialties: string[];
  activities: string[];
  collaborations: string[];
  social_links: Record<string, string>;
  phone_numbers: string[];
};

export type AboutTimelineItem = {
  id: string;
  position: number;
  title: string;
  place: string | null;
};
