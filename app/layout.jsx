import { Inter, Space_Grotesk } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata = {
  title: "Jacky — Video Editor & Visual Designer",
  description:
    "Portfolio of Jacky — 7 years of video editing: trendy edits, meme compilations, tutorials, reference recreations and Photoshop + AI composites. CapCut Desktop, Picsart, Photoshop.",
  keywords: [
    'video editor',
    'CapCut editor',
    'meme edits',
    'trendy edits',
    'video editing portfolio',
    'Jacky edits',
  ],
  authors: [{ name: 'Jacky' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Jacky — Video Editor & Visual Designer",
    description:
      'Fast-paced trendy edits, meme compilations, clean tutorials and reference-driven recreations. Human-edited. Zero AI slop.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
