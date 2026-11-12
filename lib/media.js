/**
 * Turns a pasted media URL into something the site can render.
 * Supported: YouTube, Vimeo, Streamable, Google Drive, direct video files, direct images.
 */

const VIDEO_EXT = /\.(mp4|webm|ogv|mov|m4v)(\?.*)?$/i;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg|bmp)(\?.*)?$/i;

function youtubeId(url) {
  const patterns = [
    /youtu\.be\/([\w-]{6,})/i,
    /youtube\.com\/watch\?v=([\w-]{6,})/i,
    /youtube\.com\/shorts\/([\w-]{6,})/i,
    /youtube\.com\/embed\/([\w-]{6,})/i,
    /youtube\.com\/live\/([\w-]{6,})/i,
  ];
  for (const re of patterns) {
    const match = url.match(re);
    if (match) return match[1];
  }
  return null;
}

export function resolveMedia(url, mediaType = 'video') {
  const raw = (url || '').trim();
  if (!raw) return { kind: 'none', src: '', thumb: '' };

  try {
    if (mediaType === 'image' || IMAGE_EXT.test(raw)) {
      return { kind: 'image', src: raw, thumb: raw };
    }

    const yt = youtubeId(raw);
    if (yt) {
      return {
        kind: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1`,
        thumb: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
      };
    }

    const vimeo = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeo) {
      return { kind: 'vimeo', src: `https://player.vimeo.com/video/${vimeo[1]}`, thumb: '' };
    }

    const streamable = raw.match(/streamable\.com\/(?:e\/)?([\w-]+)/i);
    if (streamable) {
      return { kind: 'streamable', src: `https://streamable.com/e/${streamable[1]}`, thumb: '' };
    }

    const drive = raw.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/i);
    if (drive) {
      return { kind: 'drive', src: `https://drive.google.com/file/d/${drive[1]}/preview`, thumb: '' };
    }

    if (VIDEO_EXT.test(raw)) {
      return { kind: 'video', src: raw, thumb: '' };
    }

    return { kind: 'link', src: raw, thumb: '' };
  } catch {
    return { kind: 'link', src: raw, thumb: '' };
  }
}

/** Aspect ratio helper: stored as "16:9" / "9:16" / "1:1". */
export function aspectClass(aspect) {
  switch (aspect) {
    case '9:16':
      return 'aspect-[9/16]';
    case '1:1':
      return 'aspect-square';
    case '4:5':
      return 'aspect-[4/5]';
    case '16:9':
    default:
      return 'aspect-video';
  }
}

export function aspectLabel(aspect) {
  switch (aspect) {
    case '9:16':
      return 'Vertical · Reels / TikTok';
    case '1:1':
      return 'Square · Feed';
    case '4:5':
      return 'Portrait · Feed';
    case '16:9':
    default:
      return 'Horizontal · YouTube';
  }
}
