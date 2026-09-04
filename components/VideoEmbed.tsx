"use client";

import { useEffect } from "react";
import { PlayCircle } from "lucide-react";
import type { VideoPlatform } from "@/lib/types";
import { getEmbedUrl, isDirectVideoFile } from "@/lib/videoEmbed";

declare global {
  interface Window {
    twttr?: { widgets?: { load: () => void } };
    instgrm?: { Embeds?: { process: () => void } };
  }
}

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

function IframeEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

function FallbackLink({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-800/60">
      <PlayCircle className="h-8 w-8 text-brand-600" aria-hidden="true" />
      <p className="text-sm text-slate-600 dark:text-slate-300">پیش‌نمایش این ویدیو در دسترس نیست.</p>
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
      >
        تماشای ویدیو
      </a>
    </div>
  );
}

export default function VideoEmbed({
  videoUrl,
  platform,
  embedCode,
  title = "ویدیو",
}: {
  videoUrl: string;
  platform: VideoPlatform;
  embedCode?: string | null;
  title?: string;
}) {
  useEffect(() => {
    if (platform === "twitter") {
      loadScriptOnce("https://platform.twitter.com/widgets.js").then(() => {
        window.twttr?.widgets?.load();
      });
    }
    if (platform === "instagram") {
      loadScriptOnce("https://www.instagram.com/embed.js").then(() => {
        window.instgrm?.Embeds?.process();
      });
    }
  }, [platform, videoUrl]);

  if (!videoUrl && !embedCode) {
    return null;
  }

  if (platform === "twitter" && videoUrl) {
    return (
      <div key={videoUrl} className="mx-auto flex justify-center [&_.twitter-tweet]:!mx-auto">
        <blockquote className="twitter-tweet" data-dir="rtl">
          <a href={videoUrl}></a>
        </blockquote>
      </div>
    );
  }

  if (platform === "instagram" && videoUrl) {
    return (
      <div key={videoUrl} className="mx-auto flex justify-center">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={videoUrl}
          data-instgrm-version="14"
        >
          <a href={videoUrl}></a>
        </blockquote>
      </div>
    );
  }

  if (platform === "custom") {
    if (embedCode) {
      return (
        <div
          className="[&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
      );
    }
    return <FallbackLink videoUrl={videoUrl} />;
  }

  if (platform === "other") {
    if (isDirectVideoFile(videoUrl)) {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video controls preload="metadata" className="absolute inset-0 h-full w-full">
            <source src={videoUrl} />
          </video>
        </div>
      );
    }
    return <FallbackLink videoUrl={videoUrl} />;
  }

  const embedUrl = getEmbedUrl(videoUrl, platform);
  if (embedUrl) {
    return <IframeEmbed src={embedUrl} title={title} />;
  }

  return <FallbackLink videoUrl={videoUrl} />;
}
