import ContactForm from "./ContactForm";

export const metadata = {
  title: "تماس | مشاور کسب‌وکار هوش مصنوعی",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">رزرو جلسه مشاوره</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          فرم زیر را پر کنید تا برای هماهنگی جلسه رایگان با شما در ارتباط باشیم.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
