export const CATEGORIES = [
  'Trendy / Viral Edits',
  'Meme Edits',
  'Tutorials',
  'Reference Edits',
  'Photoshop + AI Composites',
  'Client Work',
];

export const ASPECTS = [
  'Original',
  'Custom',
  '16:9',
  '4:3',
  '2.35:1',
  '2:1',
  '1.85:1',
  '9:16',
  '3:4',
  '5.8-inch',
  '1:1',
];

/**
 * Featured primary showreel displayed at the top hero section.
 */
export const SHOWREEL = {
  id: 'featured-showreel',
  title: 'Jacky — 2026 Master Showreel',
  category: 'Showreel & Highlights',
  aspect: '16:9',
  mediaType: 'video',
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  thumbUrl: '/images/introduction.png',
  description:
    'A quick showcase of high-retention video editing: viral pacing, meme comedy timing, clean sound design, and custom graphics.',
  duration: '1:00',
  quality: '1080P · 60FPS',
  tags: ['CapCut Desktop', 'Retention Pacing', 'Sound Design', 'Zero AI Slop'],
};

/** Shown when Firestore has no documents yet, so the layout always looks complete. */
export const SAMPLE_PROJECTS = [
  {
    id: 'sample-1',
    title: 'Fast-Paced Trend Recap',
    category: 'Trendy / Viral Edits',
    aspect: '9:16',
    mediaType: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=720&q=80',
    description: 'Beat-synced cuts, punchy sound design, kinetic captions. Built for max retention.',
    featured: true,
    order: 1,
    sample: true,
  },
  {
    id: 'sample-2',
    title: 'Meme Compilation Edit',
    category: 'Meme Edits',
    aspect: '16:9',
    mediaType: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbUrl:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    description: 'Timing-first comedy editing — setups, pauses, and payoffs that actually land.',
    featured: false,
    order: 2,
    sample: true,
  },
  {
    id: 'sample-3',
    title: 'CapCut Workflow Tutorial',
    category: 'Tutorials',
    aspect: '16:9',
    mediaType: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbUrl:
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    description: 'Clean, screen-recorded walkthroughs with zero fluff and readable pacing.',
    featured: false,
    order: 3,
    sample: true,
  },
  {
    id: 'sample-4',
    title: 'Reference Match Breakdown',
    category: 'Reference Edits',
    aspect: '1:1',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Frame-by-frame rebuild of a reference look, translated into a client-ready style.',
    featured: false,
    order: 4,
    sample: true,
  },
  {
    id: 'sample-5',
    title: 'AI Composite Graphic',
    category: 'Photoshop + AI Composites',
    aspect: '4:5',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    thumbUrl:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    description: 'AI as a precision tool: generated reference layers, human compositing on top.',
    featured: false,
    order: 5,
    sample: true,
  },
  {
    id: 'sample-6',
    title: 'Brand Promo — Client Delivery',
    category: 'Client Work',
    aspect: '16:9',
    mediaType: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbUrl:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    description: 'Full edit from raw footage to graded, captioned, delivery-ready master.',
    featured: false,
    order: 6,
    sample: true,
  },
];

export const TOOLKIT = [
  {
    name: 'CapCut Desktop',
    role: 'Primary Editor',
    note: 'Every timeline, cut, caption, keyframe and sound design pass runs here. Mastered for maximum editing speed and flow.',
    image: '/images/capcut-editing.png',
  },
  {
    name: 'Picsart / Photoshop',
    role: 'Graphics & Compositing',
    note: 'Thumbnails, YouTube banners, cutouts, reference moodboards, and layered multi-asset composites.',
    image: '/images/picsart.png',
  },
  {
    name: 'AI Enhancement Tools',
    role: 'Precision Support',
    note: 'Image generation, Google Flow / Veo / Omniflash tools, and clean AI voiceovers when raw audio is unusable.',
    image: '/images/ai-editing.png',
  },
];

export const CONTACT_CHANNELS = [
  {
    name: 'Instagram',
    rate: 90,
    label: 'Fastest',
    href: 'https://www.instagram.com/',
    handle: 'Direct Message (DM)',
    note: 'I check messages constantly when my phone is in reach and reply almost immediately.',
    tone: 'fast',
  },
  {
    name: 'YouTube Comments',
    rate: 75,
    label: 'Reliable',
    href: 'https://www.youtube.com/@JackyXfixes',
    handle: '@JackyXfixes',
    note: 'I read and reply to comments regularly, though I occasionally switch accounts while browsing.',
    tone: 'good',
  },
  {
    name: 'Discord',
    rate: 50,
    label: 'Situational',
    href: 'https://discord.gg/eRXtsNPum5',
    handle: 'discord.gg/eRXtsNPum5',
    note: 'I answer quickly when the app is open, but mobile push notifications sometimes miss pings.',
    tone: 'mid',
  },
  {
    name: 'Gmail',
    rate: 10,
    label: 'Slowest',
    href: 'mailto:anaflousoussama666@gmail.com',
    handle: 'anaflousoussama666@gmail.com',
    note: 'Multiple accounts and broken email notifications mean email is the last place I look. Use Instagram or Discord for speed!',
    tone: 'slow',
  },
];

export const FILE_HOSTS = ['Gofile', 'MEGA', 'Smash / Storage.to', 'SwissTransfer'];
