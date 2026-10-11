import { createClient } from "@supabase/supabase-js";

// برای استفاده در generateStaticParams که خارج از request scope اجرا می‌شود
// و نمی‌تواند از cookies() (و در نتیجه از lib/supabase/server.ts) استفاده کند.
export function createStaticClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
