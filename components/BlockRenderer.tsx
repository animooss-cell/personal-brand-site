import { Block } from "@/lib/types";

function getYouTubeEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getAparatEmbed(url: string) {
  const match = url.match(/aparat\.com\/v\/([\w-]+)/);
  return match ? `https://www.aparat.com/video/video/embed/videohash/${match[1]}/vt/frame` : null;
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block) => {
        switch (block.type) {
          case "text":
            return (
              <p key={block.id} className="whitespace-pre-line text-base leading-8 text-slate-700">
                {block.data.html}
              </p>
            );

          case "image":
            return (
              <figure key={block.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.data.url}
                  alt={block.data.caption ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-2xl"
                />
                {block.data.caption && (
                  <figcaption className="mt-2 text-center text-sm text-slate-400">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "video": {
            const embed = getYouTubeEmbed(block.data.url) ?? getAparatEmbed(block.data.url);
            return (
              <div key={block.id} className="aspect-video w-full overflow-hidden rounded-2xl">
                {embed ? (
                  <iframe src={embed} className="h-full w-full" allowFullScreen />
                ) : (
                  <a href={block.data.url} className="text-brand-600 underline">
                    {block.data.url}
                  </a>
                )}
              </div>
            );
          }

          case "podcast":
            return (
              <div key={block.id}>
                {block.data.url.includes("soundcloud.com") ? (
                  <iframe
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(block.data.url)}`}
                    className="h-32 w-full rounded-2xl"
                  />
                ) : (
                  <audio controls src={block.data.url} className="w-full" />
                )}
              </div>
            );

          case "code":
            return (
              <pre
                key={block.id}
                dir="ltr"
                className="overflow-x-auto rounded-2xl bg-slate-900 p-5 text-left text-sm leading-6 text-slate-100"
              >
                <code>{block.data.code}</code>
              </pre>
            );

          case "quote":
            return (
              <blockquote
                key={block.id}
                className="border-r-4 border-brand bg-brand-50/60 px-6 py-4 text-base italic leading-7 text-slate-700"
              >
                {block.data.text}
                {block.data.cite && (
                  <footer className="mt-2 text-sm font-medium text-brand-700">— {block.data.cite}</footer>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
