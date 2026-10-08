# Supplied cartoon media

The user provided `lv_0_20260813201853.mp4` and named the story **Maymoqvoyning xazinasi**. Only the first episode was requested. The original file has not been modified.

- Original: approximately 58.5 MB, 1080 × 1920 portrait, 48 seconds.
- Site asset: `public/videos/maymoqvoyning-xazinasi-1.mp4`, 720 × 1280 H.264 video with AAC audio, approximately 14 MB. Windows MediaTranscoder created the copy at 2.2 Mbps video / 128 kbps audio. MP4 metadata was moved before the media payload, with chunk offsets adjusted, for quick playback startup.
- Poster: `public/images/cartoons/maymoqvoyning-xazinasi-1.jpg`, the Windows video-frame thumbnail from the supplied file, 720 × 1280. No generated artwork replaces the supplied cartoon.
- UI and metadata: `data/books.ts`, `types/index.ts`, `components/story-media.tsx`.

Additional episodes belong in the same book's `cartoons` array, ordered by episode number. Only supplied episodes should be listed. Text pages can be added when the story text is supplied. Video watching does not award book or daily reading points.

This implementation serves static media. No backend, cloud upload service, video-watch tracking or Supabase connection has been added.
