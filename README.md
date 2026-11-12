# Jacky — Video Editing & Creative Portfolio

Next.js (App Router) + Tailwind CSS + Framer Motion + Firebase (Auth + Firestore).
White canvas, gold gradient accents, sharp black structure. Public browsing, owner-only publishing.

## 1. Install

```bash
npm install
```

## 2. Firebase setup (once)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Authentication → Sign-in method →** enable **Google**.
3. **Authentication → Settings → Authorized domains →** add your Vercel domain
   (`your-project.vercel.app`) and `localhost`.
4. **Firestore Database →** create a database (production mode).
5. **Firestore → Rules →** paste the contents of `firestore.rules` and publish.
6. **Storage → Rules →** paste `storage.rules` (deny-all; media lives on external hosts).
7. **Project settings → Your apps → Web app →** copy the config values.

## 3. Environment

```bash
cp .env.local.example .env.local
```

Fill in:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

The public site works without these (it shows sample cards). The owner dashboard needs them.

## 4. Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
```

## 5. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo on [vercel.com](https://vercel.com).
3. Add the six `NEXT_PUBLIC_FIREBASE_*` variables in **Project → Settings → Environment Variables**.
4. Deploy. Then add the `.vercel.app` domain to Firebase **Authorized domains**.

## 6. Publishing work

1. Click **Owner Sign-In** (header or the owner area near the footer).
2. Sign in with `anaflousoussama666@gmail.com` — the only account with write access.
3. Fill the dashboard form: title, style, aspect ratio, media URL, thumbnail URL, description.
4. Media URLs supported: YouTube (watch / shorts / live), Vimeo, Streamable, Google Drive,
   direct `.mp4/.webm`, direct images (Postimages, Imgur, etc.).
5. Publish — the public grid updates instantly via Firestore realtime listeners.

## 7. Firestore data shape

`portfolio/{projectId}`

| Field | Type | Notes |
|---|---|---|
| `title` | string | Card heading |
| `category` | string | Filter chip value |
| `mediaType` | `"video"` \| `"image"` | Render mode |
| `aspect` | `"16:9"` \| `"9:16"` \| `"1:1"` \| `"4:5"` | Card + lightbox ratio |
| `url` | string | Media URL |
| `thumbUrl` | string | Optional custom thumbnail |
| `description` | string | One-line blurb |
| `featured` | boolean | Reserved for pinned pieces |
| `order` | number | Lower shows first |
| `createdAt` / `updatedAt` | timestamp | Server timestamps |

## Structure

```
app/
  layout.jsx        fonts, metadata, AuthProvider
  page.jsx          section composition
  globals.css       Tailwind + design tokens
components/
  SiteHeader.jsx    sticky nav, owner sign-in
  Hero.jsx          01 — hero
  About.jsx         02 — bio + philosophy
  Toolkit.jsx       03 — software badges
  Portfolio.jsx     04 — filterable grid (Firestore)
  Lightbox.jsx      video/image modal
  Guidelines.jsx    05 — client rules & pricing
  Contact.jsx       06 — response-rate meters
  AdminPanel.jsx    owner dashboard (add / edit / delete)
  Footer.jsx
lib/
  firebase.js       client SDK init, OWNER_EMAIL
  auth-context.jsx  auth provider (popup → redirect fallback)
  media.js          URL → embed resolver
  data.js           categories, samples, contact channels
```
