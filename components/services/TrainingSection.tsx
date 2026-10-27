import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Course } from "@/lib/types";
import CourseWaitlistForm from "@/components/services/CourseWaitlistForm";

// فصل ۰۴ (آموزش‌ها) مطابق docs/design/services-redesign/index.html.
// جدول از دوره‌های منتشرشده‌ی جدول courses ساخته می‌شود؛ هیچ دوره‌ای در کد نوشته نشده است.

// ستون‌های اختیاری: اگر به جدول courses اضافه شوند، select("*") آن‌ها را برمی‌گرداند و سطر «ابزارها» و «سابقه» نمایش داده می‌شود.
type CourseRow = Course & {
  tools?: string[] | string | null;
  delivered_for?: string | null;
};

const toolsOf = (course: CourseRow) =>
  (Array.isArray(course.tools) ? course.tools.filter(Boolean).join(" · ") : course.tools?.trim()) || null;

const cell = "border-t border-[var(--svc-line)] px-6 py-[18px] align-middle";
// ستون عنوان سطرها روی موبایل هنگام اسکرول افقی سر جایش می‌ماند.
const rowHead = `${cell} sticky right-0 z-[1] bg-[var(--svc-card-b)] text-[13px] font-medium text-[var(--svc-ink3)]`;
const empty = <span className="text-[var(--svc-ink3)]">—</span>;

// راهنمای کشیدن جدول فقط تا عرضی دیده می‌شود که جدول واقعاً از قاب بیرون می‌زند (حداقل عرض جدول + ۶۴px فاصله‌ی کناری + ۲px کادر).
const SCROLL_HINT_HIDE: Record<number, string> = {
  1: "min-[401px]:hidden",
  2: "min-[576px]:hidden",
  3: "min-[751px]:hidden",
  4: "min-[926px]:hidden",
  5: "min-[1101px]:hidden",
};

export default function TrainingSection({ courses }: { courses: Course[] }) {
  const rows = courses as CourseRow[];
  const hasTools = rows.some((c) => toolsOf(c));
  const hasDelivered = rows.some((c) => c.delivered_for?.trim());

  return (
    <section
      id="training"
      aria-labelledby="training-title"
      className="bg-[var(--svc-b)] leading-[normal] text-[var(--svc-ink)]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-8 py-[120px]">
        <div className="flex max-w-[760px] flex-col gap-[18px]">
          <p className="text-[14px] font-bold text-[var(--svc-acc-t)]">۰۴ · آموزش‌ها</p>
          <h2 id="training-title" className="text-[clamp(34px,4.4vw,60px)] font-extrabold leading-[1.3]">
            تیمی که خودش
            <br />
            با هوش مصنوعی کار می‌کند.
          </h2>
          <p className="text-lg leading-[1.9] text-[var(--svc-ink2)]">
            دوره‌های حضوری در اهواز، داخل سازمان شما یا آنلاین؛ کاربردی، با ابزارهایی که از فردا در کار روزانه به کار
            می‌آیند.
          </p>
          {/* لینک داخلی به صفحه‌ی اختصاصی آموزش (حفظ لینک‌سازی داخلی) */}
          <Link
            href="/services/ai-training-ahvaz"
            className="inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-medium text-[var(--svc-ink)] underline decoration-[var(--svc-line2)] underline-offset-[6px] transition-colors duration-200 hover:text-[var(--svc-acc-t)] hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]"
          >
            جزئیات کامل: آموزش هوش مصنوعی در اهواز
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>

        <figure className="flex flex-col gap-3">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src="/images/services/stage.jpg"
              alt="دوره‌ی هوش مصنوعی در خدمت تیم روابط عمومی، سالن همایش فولاد خوزستان"
              fill
              sizes="(max-width: 1240px) 100vw, 1176px"
              className="object-cover object-[50%_45%]"
            />
          </div>
          <figcaption className="text-[13px] text-[var(--svc-ink3)]">
            دوره‌ی «هوش مصنوعی در خدمت تیم روابط عمومی»، فولاد خوزستان
          </figcaption>
        </figure>

        {rows.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div
              role="region"
              aria-labelledby="training-table-caption"
              tabIndex={0}
              className="overflow-x-auto rounded-[22px] border border-[var(--svc-line)] bg-[var(--svc-card-b)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]"
            >
              <table
                className="w-full border-separate border-spacing-0 text-right text-[15px]"
                style={{ minWidth: 160 + rows.length * 175 }}
              >
                <caption id="training-table-caption" className="sr-only">
                  مقایسه‌ی دوره‌های آموزشی
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="sticky right-0 z-[1] w-[14%] bg-[var(--svc-card-b)] px-6 py-[22px]">
                      <span className="sr-only">ویژگی</span>
                    </th>
                    {rows.map((course) => (
                      <th
                        key={course.id}
                        scope="col"
                        className="px-6 py-[22px] align-top text-[17px] font-extrabold leading-[1.6] text-[var(--svc-ink)]"
                      >
                        {/* لینک به صفحه‌ی هر دوره، مثل کارت‌های قبلی؛ حاشیه‌ی منفی ناحیه‌ی لمس را بدون تغییر چیدمان ۴۴px می‌کند. */}
                        <Link
                          href={`/services/courses/${course.slug}`}
                          className="-my-[9px] block py-[9px] underline decoration-transparent underline-offset-[6px] transition-colors duration-200 hover:text-[var(--svc-acc-t)] hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]"
                        >
                          {course.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className={rowHead}>
                      مخاطب
                    </th>
                    {rows.map((course) => (
                      <td key={course.id} className={`${cell} leading-[1.8] text-[var(--svc-ink5)]`}>
                        {course.audience || empty}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className={rowHead}>
                      مدت
                    </th>
                    {rows.map((course) => (
                      <td key={course.id} className={`${cell} text-[22px] font-extrabold`}>
                        {course.duration || empty}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className={rowHead}>
                      سطح
                    </th>
                    {rows.map((course) => (
                      <td key={course.id} className={`${cell} text-[var(--svc-ink5)]`}>
                        {course.level || empty}
                      </td>
                    ))}
                  </tr>
                  {hasTools && (
                    <tr>
                      <th scope="row" className={rowHead}>
                        ابزارها
                      </th>
                      {rows.map((course) => {
                        const tools = toolsOf(course);
                        return (
                          <td key={course.id} className={`${cell} text-[var(--svc-ink5)]`}>
                            {tools ? (
                              <span dir="ltr" className="block text-right">
                                {tools}
                              </span>
                            ) : (
                              empty
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  )}
                  {hasDelivered && (
                    <tr>
                      <th scope="row" className={rowHead}>
                        سابقه
                      </th>
                      {rows.map((course) => (
                        <td key={course.id} className={cell}>
                          {course.delivered_for?.trim() ? (
                            <span className="inline-block rounded-full bg-[var(--svc-badge-bg)] px-3 py-1.5 text-[13px] font-bold text-[var(--svc-badge-t)]">
                              برگزارشده برای {course.delivered_for.trim()}
                            </span>
                          ) : (
                            empty
                          )}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className={`text-[13px] text-[var(--svc-ink3)] ${SCROLL_HINT_HIDE[rows.length] ?? ""}`}>
              برای دیدن همه‌ی دوره‌ها، جدول را افقی بکشید.
            </p>
          </div>
        ) : (
          <p className="rounded-[22px] border border-[var(--svc-line)] bg-[var(--svc-card-b)] p-7 text-[15px] text-[var(--svc-ink2)]">
            هنوز دوره‌ای منتشر نشده است.
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          <CourseWaitlistForm />
          <Link
            href="/contact"
            className="flex min-w-0 flex-[1_1_320px] flex-col justify-between gap-4 rounded-[22px] border border-[var(--svc-line2)] p-7 text-[var(--svc-ink)] transition-colors duration-200 hover:border-[var(--svc-acc-t)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]"
          >
            <span className="text-[17px] font-bold">دوره‌ی سازمانی سفارشی می‌خواهید؟</span>
            <span className="text-[15px] text-[var(--svc-ink2)] underline underline-offset-[6px]">
              بر اساس نیاز تیم شما طراحی می‌کنیم
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
