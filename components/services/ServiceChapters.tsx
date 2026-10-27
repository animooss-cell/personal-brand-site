import Image from "next/image";
import ServiceChapter from "@/components/services/ServiceChapter";

// سه فصل خدمات (۰۱ تا ۰۳) با متن مرجع docs/design/services-redesign/index.html.
// تصاویر از public/images/services هستند؛ تصویری از کار مشتری به‌عنوان نمونه‌ی واقعی برچسب خورده است.

const caption = "text-[13px] text-[var(--svc-ink3)]";

const STARTUP_TRACK = [
  { title: "مدیر تیم اجرایی هکاتون سلامت کیش" },
  { title: "تسهیلگر، منتور و داور استارتاپ ویکند", note: "از خوزستان تا تهران و کرمانشاه" },
  { title: "برگزاری رویداد سرمایه‌گذاری طرح ملی رویش", note: "استان خوزستان" },
  { title: "دورهمی‌های کسب‌وکار در اهواز", note: "«همراه» و «حرف نو»" },
  { title: "«کافه AI»", note: "دورهمی کارکنان شرکت فولاد خوزستان" },
];

export default function ServiceChapters() {
  return (
    <>
      <ServiceChapter
        id="consulting"
        tone="a"
        eyebrow="۰۱ · مشاوره هوش مصنوعی کسب‌وکار"
        titleLines={["نه فقط تکنولوژی،", "نتیجه واقعی."]}
        description="پیدا می‌کنیم هوش مصنوعی کجای فرایندهای شما واقعاً وقت و هزینه را کم می‌کند، ابزار مناسبش را انتخاب می‌کنیم و همراه تیم پیاده‌اش می‌کنیم."
        audience={["صاحبان کسب‌وکار", "تیم‌های مدیریتی", "سازمان‌های صنعتی"]}
        media={
          <figure className="flex min-w-0 flex-[1_1_440px] flex-col gap-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px]">
              <Image
                src="/images/services/class.jpg"
                alt="عبدالله احمدیان در حال آموزش در سالن آموزش فولاد خوزستان"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <figcaption className={caption}>کارگاه آموزشی، فولاد خوزستان</figcaption>
          </figure>
        }
        deliverables={[
          "فهرست فرصت‌های هوش مصنوعی در فرایندهایتان",
          "ابزارهای انتخاب‌شده و پیاده‌شده با تیم",
          "گزارش سنجش نتایج و بهینه‌سازی",
        ]}
        steps={[
          "شناسایی فرصت‌های هوش مصنوعی در فرایندها",
          "انتخاب ابزارهای مناسب",
          "پیاده‌سازی و تست با تیم",
          "سنجش نتایج و بهینه‌سازی",
        ]}
        ctaLabel="درباره‌ی کسب‌وکارم صحبت کنیم"
        subpage={{ href: "/services/ai-business-consulting", label: "مشاور کسب‌وکار با هوش مصنوعی" }}
      />

      <ServiceChapter
        id="growth"
        tone="b"
        mediaFirst
        eyebrow="۰۲ · مشاوره رشد کسب‌وکار و استارتاپ"
        titleLines={["از ایده تا", "مدل درآمدی پایدار."]}
        description="ایده و بازار را اعتبارسنجی می‌کنیم، یک مدل درآمدی واقع‌بینانه می‌سازیم و مسیر شش ماه آینده را قدم‌به‌قدم می‌چینیم."
        audience={["صاحبان ایده", "استارتاپ‌های مرحله‌ی اول", "کسب‌وکارهای نوپا"]}
        media={
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px] rounded-[28px] border border-[var(--svc-line)] bg-[var(--svc-card-b)] p-9">
            <p className="text-[14px] font-bold text-[var(--svc-ink3)]">سابقه در اکوسیستم استارتاپی</p>
            <ul className="flex flex-col">
              {STARTUP_TRACK.map(({ title, note }) => (
                <li key={title} className="flex flex-col gap-1 border-t border-[var(--svc-line)] py-4">
                  <span className="text-[17px] font-bold">{title}</span>
                  {note && <span className="text-[14px] text-[var(--svc-ink2)]">{note}</span>}
                </li>
              ))}
            </ul>
          </div>
        }
        deliverables={["مدل درآمدی واقع‌بینانه", "نقشه‌ی راه اجرایی ۶ ماهه", "آمادگی برای جذب سرمایه‌گذار"]}
        steps={[
          "اعتبارسنجی ایده و بازار",
          "طراحی مدل درآمدی واقع‌بینانه",
          "نقشه‌ی راه اجرایی ۶ ماهه",
          "آمادگی برای سرمایه‌گذار",
        ]}
        ctaLabel="درباره‌ی رشد کسب‌وکارم صحبت کنیم"
        subpage={{ href: "/services/ai-growth-consulting", label: "مشاور توسعه و رشد کسب‌وکار" }}
      />

      <ServiceChapter
        id="content"
        tone="a"
        eyebrow="۰۳ · محتوا و بازاریابی با هوش مصنوعی"
        titleLines={["جذب مشتری،", "نه فقط فالوور."]}
        description="محتوای فعلی و پیج شما را بررسی می‌کنیم، قیف فروش و تقویم محتوا را طراحی می‌کنیم و با هوش مصنوعی محتوایی می‌سازیم که به فروش برسد."
        audience={["کسب‌وکارهای آنلاین", "برندهای در حال رشد", "فروشگاه‌ها و پیج‌های اینستاگرام"]}
        media={
          <figure className="flex min-w-0 flex-[1_1_440px] flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-[22px]">
                <Image
                  src="/images/services/basij.jpg"
                  alt="پوستر جشنواره‌ی رسانه‌ای بانوان برای بسیج رسانه خوزستان"
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[22px]">
                <Image
                  src="/images/services/report1.jpg"
                  alt="صفحه‌ی عملکرد تولید از گزارش مجمع فولاد خوزستان"
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[22px]">
                <Image
                  src="/images/services/report2.jpg"
                  alt="صفحه‌ی زنجیره ارزش از گزارش مجمع فولاد خوزستان"
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className={`${caption} leading-[1.8]`}>
              نمونه‌های واقعی: پوستر بسیج رسانه خوزستان و صفحات گزارش مجمع سالیانه‌ی فولاد خوزستان، تهیه‌شده با هوش مصنوعی
            </figcaption>
          </figure>
        }
        steps={[
          "بررسی محتوا و پیج فعلی",
          "طراحی قیف فروش و تقویم محتوا",
          "تولید محتوا با هوش مصنوعی",
          "گزارش ماهانه و بهینه‌سازی",
        ]}
        ctaLabel="درباره‌ی محتوای برندم صحبت کنیم"
        subpage={{ href: "/services/ai-content-generation", label: "تولید محتوا با هوش مصنوعی" }}
      />
    </>
  );
}
