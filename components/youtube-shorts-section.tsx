import { getChannelShorts } from "@/lib/youtube";
import { YouTubeReelsEntry } from "./youtube-reels-entry";
import { YouTubeShortsHeader } from "./youtube-shorts-header";

export async function YouTubeShortsSection() {
  const shorts = await getChannelShorts();

  if (shorts.length === 0) return null;

  return (
    <section id="reels" className="w-full py-8 xs:py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        <YouTubeShortsHeader />
        <YouTubeReelsEntry shorts={shorts} />
      </div>
    </section>
  );
}
