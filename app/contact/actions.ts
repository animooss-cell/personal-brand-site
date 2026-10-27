"use server";

import { createClient } from "@/lib/supabase/server";
import {
  channelOf,
  readFields,
  toContactRow,
  validateDetails,
  validateTopic,
  type ContactFields,
  type FieldErrors,
} from "@/components/contact/contactForm";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; channel: string }
  | { status: "invalid"; errors: FieldErrors; values: ContactFields }
  | { status: "failed"; values: ContactFields };

// فقط وقتی جاوااسکریپت مرورگر خاموش است اجرا می‌شود (فرم یک‌مرحله‌ای داخل noscript).
// همان درج فرم مرورگر را در همان جدول contacts و با همان کلید عمومی (anon) انجام می‌دهد.
export async function submitContactWithoutJs(_prev: ContactFormState, data: FormData): Promise<ContactFormState> {
  const values = readFields(data);
  const topicError = validateTopic(values.topic);
  const errors: FieldErrors = { ...(topicError ? { topic: topicError } : {}), ...validateDetails(values) };
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const { error } = await createClient().from("contacts").insert(toContactRow(values));
  if (error) return { status: "failed", values };
  return { status: "success", channel: channelOf(values.channel) };
}
