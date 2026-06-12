import { curatedYoutubeShorts } from "@/data/youtube-shorts";
import {
  MAX_SHORTS,
  SHORTS_MAX_DURATION_SECONDS,
  YOUTUBE_CHANNEL_HANDLE,
} from "@/lib/constants/youtube";

export type YouTubeShort = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
};

function parseIso8601Duration(duration: string): number {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );
  if (!match) return 0;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function getThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function toShorts(
  items: Array<{ videoId: string; title?: string }>
): YouTubeShort[] {
  return items.slice(0, MAX_SHORTS).map(({ videoId, title }) => ({
    videoId,
    title: title || "Barnick Pracharani",
    thumbnailUrl: getThumbnailUrl(videoId),
  }));
}

async function fetchFromYouTubeApi(apiKey: string): Promise<YouTubeShort[]> {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${YOUTUBE_CHANNEL_HANDLE}&key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );

  if (!channelRes.ok) {
    throw new Error(`channels.list failed: ${channelRes.status}`);
  }

  const channelData = await channelRes.json();
  const uploadsPlaylistId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    throw new Error("Uploads playlist not found for channel");
  }

  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );

  if (!playlistRes.ok) {
    throw new Error(`playlistItems.list failed: ${playlistRes.status}`);
  }

  const playlistData = await playlistRes.json();
  const videoIds: string[] =
    playlistData.items
      ?.map(
        (item: { snippet?: { resourceId?: { videoId?: string } } }) =>
          item.snippet?.resourceId?.videoId
      )
      .filter(Boolean) ?? [];

  if (videoIds.length === 0) return [];

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(",")}&key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );

  if (!videosRes.ok) {
    throw new Error(`videos.list failed: ${videosRes.status}`);
  }

  const videosData = await videosRes.json();
  const shorts: YouTubeShort[] =
    videosData.items
      ?.filter(
        (item: {
          contentDetails?: { duration?: string };
        }) => {
          const duration = item.contentDetails?.duration;
          if (!duration) return false;
          return (
            parseIso8601Duration(duration) <= SHORTS_MAX_DURATION_SECONDS
          );
        }
      )
      .map(
        (item: {
          id: string;
          snippet?: {
            title?: string;
            thumbnails?: { high?: { url?: string }; medium?: { url?: string } };
          };
        }) => ({
          videoId: item.id,
          title: item.snippet?.title || "Barnick Pracharani",
          thumbnailUrl:
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.medium?.url ||
            getThumbnailUrl(item.id),
        })
      ) ?? [];

  return shorts.slice(0, MAX_SHORTS);
}

export async function getChannelShorts(): Promise<YouTubeShort[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (apiKey) {
    try {
      const shorts = await fetchFromYouTubeApi(apiKey);
      if (shorts.length > 0) return shorts;
    } catch (error) {
      console.warn("YouTube API fetch failed, using curated fallback:", error);
    }
  }

  return toShorts(curatedYoutubeShorts);
}
