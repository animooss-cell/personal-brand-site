"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { CONTACT_TELEGRAM_URL, CONTACT_WHATSAPP_URL } from "@/lib/contactInfo";
import {
  CHANNELS,
  DEFAULT_CHANNEL,
  PHONE_EXAMPLE,
  TOPICS,
  toContactRow,
  validateDetails,
  validateTopic,
  type ContactFields,
  type FieldErrors,
} from "@/components/contact/contactForm";
import contactTheme from "@/components/contact/contactTheme.module.css";
import { submitContactWithoutJs, type ContactFormState } from "./actions";

// فرم دومرحله‌ای رزرو جلسه (مرجع: docs/design/contact-redesign/index.html).
// ارسال مثل قبل مستقیم از مرورگر در جدول contacts ثبت می‌شود. بدون جاوااسکریپت، فرم یک‌مرحله‌ای داخل noscript
// نمایش داده می‌شود و از مسیر سرور (app/contact/actions.ts) همان درج را انجام می‌دهد.

type Step = "topic" | "details" | "done";

const EMPTY: ContactFields = {
  topic: "",
  channel: DEFAULT_CHANNEL,
  name: "",
  business: "",
  phone: "",
  email: "",
  message: "",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]";
const fieldClass = `w-full rounded-[14px] border border-[var(--ct-field-line)] bg-[var(--svc-input)] px-4 text-[16px] text-[var(--svc-ink)] transition-colors duration-200 placeholder:text-[var(--svc-ink3)] aria-[invalid=true]:border-[var(--ct-error)] ${focusRing} focus-visible:outline-offset-1`;
const choiceBase = `min-h-[52px] rounded-[14px] px-[18px] text-[15px] text-[var(--svc-ink)] transition-colors duration-200 hover:border-[var(--svc-acc-t)] ${focusRing}`;
const choiceOn = "border-[1.5px] border-[var(--svc-acc-t)] bg-[var(--ct-acc-soft)] font-bold";
const choiceOff = "border border-[var(--ct-field-line)] font-medium";
const primaryButton =
  "min-h-14 cursor-pointer rounded-full bg-cta text-[16px] font-bold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-70";

function StepHeader({
  id,
  title,
  step,
  headingRef,
}: {
  id: string;
  title: string;
  step: 1 | 2;
  headingRef?: React.Ref<HTMLHeadingElement>;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h2 id={id} ref={headingRef} tabIndex={-1} className="text-[24px] font-extrabold focus:outline-none">
          {title}
        </h2>
        <span className="shrink-0 text-[13px] text-[var(--svc-ink3)]">مرحله‌ی {step === 1 ? "۱" : "۲"} از ۲</span>
      </div>
      <div aria-hidden="true" className="h-1 rounded-full bg-[var(--svc-line)]">
        <div className={`h-full rounded-full bg-cta ${step === 1 ? "w-1/2" : "w-full"}`} />
      </div>
    </>
  );
}

// پیام خطای کنار هر فیلد؛ ظرف aria-live از اول در صفحه هست تا متن تازه‌اش خوانده شود.
function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <p id={id} aria-live="polite" className="text-[13px] font-medium text-[var(--ct-error)] empty:hidden">
      {children}
    </p>
  );
}

function Label({ htmlFor, children, hint }: { htmlFor: string; children: ReactNode; hint?: "required" | "optional" }) {
  return (
    <label htmlFor={htmlFor} className="text-[14px] font-medium">
      {children}
      {hint === "required" && (
        <span className="text-[var(--svc-ink3)]">
          {" "}
          *<span className="sr-only"> (الزامی)</span>
        </span>
      )}
      {hint === "optional" && <span className="font-normal text-[var(--svc-ink3)]"> (اختیاری)</span>}
    </label>
  );
}

type FieldProps = {
  id: string;
  name: keyof ContactFields;
  label: string;
  hint?: "required" | "optional";
  error?: string;
  values?: ContactFields;
  onChange?: (name: keyof ContactFields, value: string) => void;
  defaults?: Partial<ContactFields>;
  type?: string;
  autoComplete: string;
  inputMode?: "tel" | "email" | "text";
  placeholder?: string;
  ltr?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

function TextField({ id, name, label, hint, error, values, onChange, defaults, ltr, inputRef, ...rest }: FieldProps) {
  const errorId = `${id}-error`;
  const controlled = values && onChange;
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        ref={inputRef}
        name={name}
        aria-required={hint === "required" || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        dir={ltr ? "ltr" : undefined}
        className={`${fieldClass} min-h-[54px] ${ltr ? "text-right [unicode-bidi:isolate]" : ""}`}
        {...(controlled
          ? { value: values[name], onChange: (e) => onChange(name, e.target.value) }
          : { defaultValue: defaults?.[name] ?? "" })}
        {...rest}
      />
      <FieldError id={errorId}>
        {error}
        {error && name === "phone" && (
          <>
            {" "}
            مثال:{" "}
            <span dir="ltr" className="[unicode-bidi:isolate]">
              {PHONE_EXAMPLE}
            </span>
          </>
        )}
      </FieldError>
    </div>
  );
}

function DetailFields(props: {
  idPrefix: string;
  errors: FieldErrors;
  values?: ContactFields;
  onChange?: (name: keyof ContactFields, value: string) => void;
  defaults?: Partial<ContactFields>;
  refs?: Partial<Record<"name" | "phone" | "email", React.Ref<HTMLInputElement>>>;
}) {
  const { idPrefix: p, errors, refs, ...state } = props;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
      <TextField
        id={`${p}-name`}
        name="name"
        label="نام"
        hint="required"
        autoComplete="name"
        error={errors.name}
        inputRef={refs?.name}
        {...state}
      />
      <TextField
        id={`${p}-business`}
        name="business"
        label="نام کسب‌وکار یا سازمان"
        autoComplete="organization"
        {...state}
      />
      <TextField
        id={`${p}-phone`}
        name="phone"
        label="شماره موبایل"
        hint="required"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
        ltr
        error={errors.phone}
        inputRef={refs?.phone}
        {...state}
      />
      <TextField
        id={`${p}-email`}
        name="email"
        label="ایمیل"
        hint="optional"
        type="email"
        inputMode="email"
        autoComplete="email"
        ltr
        error={errors.email}
        inputRef={refs?.email}
        {...state}
      />
    </div>
  );
}

function MessageField({
  id,
  values,
  onChange,
  defaultValue,
}: {
  id: string;
  values?: ContactFields;
  onChange?: (name: keyof ContactFields, value: string) => void;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} hint="optional">
        چند کلمه درباره‌ی کارتان
      </Label>
      <textarea
        id={id}
        name="message"
        rows={3}
        placeholder="مثلاً: گزارش‌های ماهانه‌مان زیادی وقت می‌گیرد."
        className={`${fieldClass} resize-y py-3.5 leading-[1.8]`}
        {...(values && onChange
          ? { value: values.message, onChange: (e) => onChange("message", e.target.value) }
          : { defaultValue: defaultValue ?? "" })}
      />
    </div>
  );
}

function PrivacyNote() {
  return (
    <p className="flex items-center gap-2 text-[13px] text-[var(--svc-ink3)]">
      <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
      اطلاعات شما فقط برای هماهنگی جلسه استفاده می‌شود.
    </p>
  );
}

function SubmitFailed() {
  return (
    <p role="alert" className="text-[14px] leading-[1.9] text-[var(--ct-error)]">
      ارسال درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید یا مستقیم در{" "}
      <a
        href={CONTACT_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-bold underline ${focusRing}`}
      >
        واتس‌اپ
      </a>{" "}
      یا{" "}
      <a
        href={CONTACT_TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-bold underline ${focusRing}`}
      >
        تلگرام
      </a>{" "}
      پیام بدهید.
    </p>
  );
}

function Success({
  channel,
  headingRef,
  onReset,
}: {
  channel: string;
  headingRef?: React.Ref<HTMLHeadingElement>;
  onReset?: () => void;
}) {
  const nextLink = `flex min-h-[54px] items-center justify-between gap-3 rounded-[14px] border border-[var(--svc-line)] px-[18px] text-[15px] text-[var(--svc-ink)] transition-colors duration-200 hover:border-[var(--svc-acc-t)] hover:text-[var(--svc-acc-t)] ${focusRing}`;
  return (
    <div role="status" className={`flex flex-col items-start gap-[18px] py-3 ${contactTheme.stepIn}`}>
      <span
        aria-hidden="true"
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ct-badge-bg)]"
      >
        <Check className="h-[30px] w-[30px] text-[var(--svc-acc-t)]" strokeWidth={2.4} />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="text-[28px] font-extrabold focus:outline-none">
        درخواستتان رسید.
      </h2>
      <p className="text-[17px] leading-[1.9] text-[var(--svc-ink2)]">
        ظرف ۲۴ ساعت از طریق <strong className="text-[var(--svc-ink)]">{channel}</strong> برای هماهنگی زمان جلسه{" "}
        {channel === "تماس تلفنی" ? "با شما تماس می‌گیرم." : "پیام می‌دهم."}
      </p>
      <div className="flex w-full flex-col gap-3 border-t border-[var(--svc-line)] pt-[18px]">
        <span className="text-[14px] text-[var(--svc-ink3)]">تا آن موقع:</span>
        <Link href="/downloads" className={nextLink}>
          فایل‌های رایگان را ببینید
          <ArrowLeft className="h-[18px] w-[18px] shrink-0 text-[var(--svc-acc-t)]" aria-hidden="true" />
        </Link>
        <Link href="/blog" className={nextLink}>
          مقاله‌ها را بخوانید
          <ArrowLeft className="h-[18px] w-[18px] shrink-0 text-[var(--svc-acc-t)]" aria-hidden="true" />
        </Link>
      </div>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className={`min-h-11 text-[14px] text-[var(--svc-ink3)] underline underline-offset-[5px] hover:text-[var(--svc-acc-t)] ${focusRing}`}
        >
          ثبت یک درخواست دیگر
        </button>
      ) : (
        <a
          href="/contact"
          className={`inline-flex min-h-11 items-center text-[14px] text-[var(--svc-ink3)] underline underline-offset-[5px] ${focusRing}`}
        >
          ثبت یک درخواست دیگر
        </a>
      )}
    </div>
  );
}

// فرم یک‌مرحله‌ای برای مرورگرِ بدون جاوااسکریپت؛ فقط داخل noscript رندر می‌شود.
function NoJsForm({ state, action }: { state: ContactFormState; action: (data: FormData) => void }) {
  if (state.status === "success") return <Success channel={state.channel} />;
  const values = state.status === "invalid" || state.status === "failed" ? state.values : undefined;
  const errors = state.status === "invalid" ? state.errors : {};
  const radio = (name: string, value: string, checked: boolean) => (
    <label
      key={value}
      className={`${choiceBase} ${choiceOff} flex cursor-pointer items-center gap-2.5 has-[:checked]:border-[1.5px] has-[:checked]:border-[var(--svc-acc-t)] has-[:checked]:bg-[var(--ct-acc-soft)] has-[:checked]:font-bold`}
    >
      <input type="radio" name={name} value={value} defaultChecked={checked} className="accent-[#00C389]" />
      {value}
    </label>
  );
  return (
    <form action={action} className="flex flex-col gap-5">
      <h2 className="text-[24px] font-extrabold">درخواست جلسه‌ی رایگان</h2>
      <fieldset className="flex flex-col gap-2.5" aria-describedby="nj-topic-error">
        <legend className="mb-2.5 text-[14px] font-medium">دنبال چه هستید؟</legend>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
          {TOPICS.map((t) => radio("topic", t, values?.topic === t))}
        </div>
        <FieldError id="nj-topic-error">{errors.topic}</FieldError>
      </fieldset>
      <DetailFields idPrefix="nj" errors={errors} defaults={values} />
      <fieldset className="flex flex-col">
        <legend className="mb-2.5 text-[14px] font-medium">از کجا پیگیری کنم؟</legend>
        <div className="flex flex-wrap gap-2.5">
          {CHANNELS.map((c) => radio("channel", c, (values?.channel ?? DEFAULT_CHANNEL) === c))}
        </div>
      </fieldset>
      <MessageField id="nj-message" defaultValue={values?.message} />
      {state.status === "failed" && <SubmitFailed />}
      <button type="submit" className={`${primaryButton} w-full`}>
        درخواست جلسه رایگان
      </button>
      <PrivacyNote />
    </form>
  );
}

export default function ContactForm() {
  const [serverState, serverAction] = useFormState<ContactFormState, FormData>(submitContactWithoutJs, {
    status: "idle",
  });
  const [step, setStep] = useState<Step>("topic");
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  const topicHeading = useRef<HTMLHeadingElement>(null);
  const detailsHeading = useRef<HTMLHeadingElement>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  // با هر تغییر مرحله، فوکوس به تیتر مرحله‌ی تازه می‌رود (نه در بار اول صفحه).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    ({ topic: topicHeading, details: detailsHeading, done: doneHeading })[step].current?.focus();
  }, [step]);

  const update = (name: keyof ContactFields, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof FieldErrors]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  function goToDetails() {
    const topicError = validateTopic(values.topic);
    if (topicError) {
      setErrors({ topic: topicError });
      return;
    }
    setErrors({});
    setStep("details");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const found = validateDetails(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      (found.name ? nameRef : found.phone ? phoneRef : emailRef).current?.focus();
      return;
    }
    setFailed(false);
    setSubmitting(true);
    const { error } = await createClient().from("contacts").insert(toContactRow(values));
    setSubmitting(false);
    if (error) {
      setFailed(true);
      return;
    }
    setStep("done");
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setFailed(false);
    setStep("topic");
  }

  return (
    <div
      className={`flex flex-col gap-[26px] rounded-[28px] border border-[var(--svc-line)] bg-[var(--svc-card-a)] p-9 ${contactTheme.card}`}
    >
      {/* بدون جاوااسکریپت، فرم دومرحله‌ای پنهان می‌شود و فرم یک‌مرحله‌ای داخل noscript جایش را می‌گیرد. */}
      <noscript>
        <style>{".ct-js-form{display:none!important}"}</style>
        <NoJsForm state={serverState} action={serverAction} />
      </noscript>

      <div className="ct-js-form">
        {step === "topic" && (
          <div className={`flex flex-col gap-[22px] ${contactTheme.stepIn}`}>
            <StepHeader id="ct-topic-title" title="دنبال چه هستید؟" step={1} headingRef={topicHeading} />
            <div className="flex flex-col gap-2">
              <div
                role="group"
                aria-labelledby="ct-topic-title"
                aria-describedby="ct-topic-error"
                className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5"
              >
                {TOPICS.map((topic) => {
                  const on = values.topic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={on}
                      onClick={() => update("topic", topic)}
                      className={`${choiceBase} text-right ${on ? choiceOn : choiceOff}`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
              <FieldError id="ct-topic-error">{errors.topic}</FieldError>
            </div>
            <button type="button" onClick={goToDetails} className={`${primaryButton} w-full`}>
              ادامه
            </button>
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleSubmit} noValidate className={`flex flex-col gap-5 ${contactTheme.stepIn}`}>
            <StepHeader id="ct-details-title" title="چطور با شما در تماس باشم؟" step={2} headingRef={detailsHeading} />
            <p className="text-[14px] text-[var(--svc-ink2)]">
              موضوع: <strong className="text-[var(--svc-ink)]">{values.topic}</strong>
            </p>

            <DetailFields
              idPrefix="ct"
              errors={errors}
              values={values}
              onChange={update}
              refs={{ name: nameRef, phone: phoneRef, email: emailRef }}
            />

            <div className="flex flex-col gap-2.5">
              <span id="ct-channel-label" className="text-[14px] font-medium">
                از کجا پیگیری کنم؟
              </span>
              <div role="group" aria-labelledby="ct-channel-label" className="flex flex-wrap gap-2.5">
                {CHANNELS.map((channel) => {
                  const on = values.channel === channel;
                  return (
                    <button
                      key={channel}
                      type="button"
                      aria-pressed={on}
                      onClick={() => update("channel", channel)}
                      className={`${choiceBase} flex-[1_1_120px] text-center ${on ? choiceOn : choiceOff}`}
                    >
                      {channel}
                    </button>
                  );
                })}
              </div>
            </div>

            <MessageField id="ct-message" values={values} onChange={update} />

            {failed && <SubmitFailed />}

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" disabled={submitting} className={`${primaryButton} flex-[1_1_240px]`}>
                {submitting ? "در حال ارسال…" : "درخواست جلسه رایگان"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setStep("topic");
                }}
                className={`min-h-14 cursor-pointer rounded-full border border-[var(--svc-line2)] px-[22px] text-[15px] text-[var(--svc-ink)] transition-colors duration-200 hover:border-[var(--svc-acc-t)] hover:text-[var(--svc-acc-t)] ${focusRing}`}
              >
                بازگشت
              </button>
            </div>
            <PrivacyNote />
          </form>
        )}

        {step === "done" && <Success channel={values.channel} headingRef={doneHeading} onReset={reset} />}
      </div>
    </div>
  );
}
