// TipTap (prosemirror-tables) جدول را فقط با یک <tbody> سریالایز می‌کند و
// تمایز <thead>/<tbody> موجود در HTML ورودی را روی خروجی حفظ نمی‌کند (چون
// schema داخلی‌اش ردیف‌ها را گروه‌بندی نمی‌کند، فقط سلول‌ها را th/td می‌داند).
// این تابع بعد از هر editor.getHTML()، ردیف‌های ابتدایی هر جدول را که همه‌ی
// سلول‌هایشان th هستند داخل یک <thead> قرار می‌دهد و بقیه را در <tbody>
// نگه می‌دارد، تا خروجی نهایی semantically درست و با HTML ورودی سازگار بماند.
export function restoreTheadTbody(html: string): string {
  if (typeof document === "undefined" || !html.includes("<table")) return html;

  const container = document.createElement("div");
  container.innerHTML = html;

  container.querySelectorAll("table").forEach((table) => {
    const tbody = table.querySelector(":scope > tbody");
    if (!tbody) return;

    const rows = Array.from(tbody.children) as HTMLTableRowElement[];
    let splitIndex = 0;
    while (
      splitIndex < rows.length &&
      rows[splitIndex].children.length > 0 &&
      Array.from(rows[splitIndex].children).every((cell) => cell.tagName === "TH")
    ) {
      splitIndex += 1;
    }

    if (splitIndex === 0) return;

    const thead = document.createElement("thead");
    rows.slice(0, splitIndex).forEach((row) => thead.appendChild(row));
    table.insertBefore(thead, tbody);
  });

  return container.innerHTML;
}
