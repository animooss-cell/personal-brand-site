import { Node, mergeAttributes } from "@tiptap/core";

// این دو Node، دقیقاً مثل TiptapImage، اتم (بدون محتوای قابل ویرایش) هستن؛
// خروجی‌شون مستقیم در content (HTML) ذخیره می‌شه و prose renderer عمومی
// (همون کلاس prose-content که برای پست وبلاگ/منبع دانلودی/دوره استفاده
// می‌شه) بدون نیاز به هیچ پردازش اضافه، آن‌ها را نمایش می‌دهد.

const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    videoEmbed: {
      insertVideoEmbed: (options: { src: string; kind: "iframe" | "file" }) => ReturnType;
    };
    audioEmbed: {
      insertAudioEmbed: (options: { src: string }) => ReturnType;
    };
  }
}

export const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      // src/kind را خودمان دستی روی iframe/video (نه روی div بیرونی) می‌گذاریم
      src: { default: null, renderHTML: () => ({}) },
      kind: { default: "iframe", renderHTML: () => ({}) },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.video-embed",
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          const iframe = el.querySelector("iframe");
          if (iframe) {
            const src = iframe.getAttribute("src");
            return src ? { src, kind: "iframe" } : false;
          }
          const video = el.querySelector("video");
          if (video) {
            const src = video.getAttribute("src") || video.querySelector("source")?.getAttribute("src");
            return src ? { src, kind: "file" } : false;
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { src, kind } = node.attrs as { src: string; kind: "iframe" | "file" };
    const wrapperAttrs = mergeAttributes({ class: "video-embed" }, HTMLAttributes);

    if (kind === "file") {
      return ["div", wrapperAttrs, ["video", { src, controls: "true", preload: "metadata" }]];
    }

    return [
      "div",
      wrapperAttrs,
      [
        "iframe",
        {
          src,
          allow: IFRAME_ALLOW,
          allowfullscreen: "true",
          loading: "lazy",
          frameborder: "0",
          sandbox:
            "allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox",
        },
      ],
    ];
  },

  addCommands() {
    return {
      insertVideoEmbed:
        (options) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: options }),
    };
  },
});

export const AudioEmbed = Node.create({
  name: "audioEmbed",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      // src را خودمان دستی روی audio (نه روی div بیرونی) می‌گذاریم
      src: { default: null, renderHTML: () => ({}) },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.audio-embed",
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          const audio = el.querySelector("audio");
          if (!audio) return false;
          const src = audio.getAttribute("src") || audio.querySelector("source")?.getAttribute("src");
          return src ? { src } : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "div",
      mergeAttributes({ class: "audio-embed" }, HTMLAttributes),
      ["audio", { src: node.attrs.src, controls: "true", preload: "metadata" }],
    ];
  },

  addCommands() {
    return {
      insertAudioEmbed:
        (options) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: options }),
    };
  },
});
