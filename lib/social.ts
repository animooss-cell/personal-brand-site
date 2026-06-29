export function toWhatsappHref(value: string) {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `98${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}
