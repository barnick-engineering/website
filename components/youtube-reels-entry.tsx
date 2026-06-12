"use client";

import { useState } from "react";
import Image from "next/image";
import { CirclePlay, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { YOUTUBE_SHORTS_URL } from "@/lib/constants/youtube";
import type { YouTubeShort } from "@/lib/youtube";
import { YouTubeReelsViewer } from "./youtube-reels-viewer";

type YouTubeReelsEntryProps = {
  shorts: YouTubeShort[];
};

export function YouTubeReelsEntry({ shorts }: YouTubeReelsEntryProps) {
  const { t } = useLanguage();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const preview = shorts[0];

  if (!preview) return null;

  return (
    <>
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => setIsViewerOpen(true)}
          className="group relative w-[min(100%,280px)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
          aria-label={t("reels.tapToWatch")}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border-2 border-border shadow-xl bg-muted">
            <Image
              src={preview.thumbnailUrl}
              alt={preview.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <CirclePlay className="h-9 w-9 text-black fill-black/10" />
              </div>
              <span className="text-white font-semibold text-lg drop-shadow-md">
                {t("reels.tapToWatch")}
              </span>
              <span className="text-white/80 text-sm drop-shadow-md">
                {t("reels.swipeHint")}
              </span>
            </div>
          </div>
        </button>

        <p className="mt-4 text-sm text-muted-foreground">
          {shorts.length} {t("reels.countLabel")}
        </p>

        <a
          href={YOUTUBE_SHORTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          {t("reels.viewAll")}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <YouTubeReelsViewer
        shorts={shorts}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  );
}
