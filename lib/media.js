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

/**
 * Aspect Ratio specifications matching the CapCut design in ratio types.png
 */
export const ASPECT_OPTIONS = [
  { id: 'Original', label: 'Original', iconWidth: 20, iconHeight: 14, group: 'auto' },
  { id: 'Custom', label: 'Custom', iconWidth: 20, iconHeight: 12, group: 'auto' },
  { id: '16:9', label: '16:9', iconWidth: 22, iconHeight: 12, group: 'horizontal' },
  { id: '4:3', label: '4:3', iconWidth: 20, iconHeight: 15, group: 'horizontal' },
  { id: '2.35:1', label: '2.35:1', iconWidth: 24, iconHeight: 10, group: 'horizontal' },
  { id: '2:1', label: '2:1', iconWidth: 22, iconHeight: 11, group: 'horizontal' },
  { id: '1.85:1', label: '1.85:1', iconWidth: 22, iconHeight: 12, group: 'horizontal' },
  { id: '9:16', label: '9:16', iconWidth: 12, iconHeight: 22, group: 'vertical' },
  { id: '3:4', label: '3:4', iconWidth: 15, iconHeight: 20, group: 'vertical' },
  { id: '5.8-inch', label: '5.8-inch', iconWidth: 11, iconHeight: 24, group: 'vertical' },
  { id: '1:1', label: '1:1', iconWidth: 18, iconHeight: 18, group: 'square' },
];

/** CSS Aspect Ratio class helper */
export function aspectClass(aspect) {
  switch (aspect) {
    case 'Original':
      return 'aspect-auto min-h-[220px]';
    case 'Custom':
      return '';
    case '4:3':
      return 'aspect-[4/3]';
    case '2.35:1':
      return 'aspect-[2.35/1]';
    case '2:1':
      return 'aspect-[2/1]';
    case '1.85:1':
      return 'aspect-[1.85/1]';
    case '9:16':
      return 'aspect-[9/16]';
    case '3:4':
      return 'aspect-[3/4]';
    case '5.8-inch':
      return 'aspect-[9/19.5]';
    case '1:1':
      return 'aspect-square';
    case '4:5':
      return 'aspect-[4/5]';
    case '16:9':
    default:
      return 'aspect-video';
  }
}

/** Dynamic inline style for Custom aspect ratios (e.g. "21:9", "18/9") */
export function aspectStyle(aspect, customRatio) {
  if (aspect === 'Custom' && customRatio) {
    const formatted = String(customRatio).replace(':', '/').trim();
    if (formatted) {
      return { aspectRatio: formatted };
    }
  }
  return {};
}

export function aspectLabel(aspect, customRatio) {
  switch (aspect) {
    case 'Original':
      return 'Original · Auto';
    case 'Custom':
      return customRatio ? `Custom (${customRatio})` : 'Custom';
    case '9:16':
      return '9:16 · Reels / TikTok';
    case '3:4':
      return '3:4 · Portrait';
    case '5.8-inch':
      return '5.8" · Full Mobile';
    case '1:1':
      return '1:1 · Square';
    case '4:3':
      return '4:3 · Classic';
    case '2.35:1':
      return '2.35:1 · Cinema';
    case '2:1':
      return '2:1 · Univisium';
    case '1.85:1':
      return '1.85:1 · DCI';
    case '4:5':
      return '4:5 · Feed';
    case '16:9':
    default:
      return '16:9 · Widescreen';
  }
}
