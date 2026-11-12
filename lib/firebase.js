import { getApps, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/** The only account allowed to write to Firestore. Must match firestore.rules exactly. */
export const OWNER_EMAIL = 'anaflousoussama666@gmail.com';

/**
 * Firebase web config for project `jacky-s-portfolio`.
 * Baked in so the site works on Vercel with zero env setup; each value can still be
 * overridden by a NEXT_PUBLIC_FIREBASE_* variable if the project is ever swapped.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyChuczFkzUCAfmcVKxqIJBiO6cVQhdtePg',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'jacky-s-portfolio.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'jacky-s-portfolio',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'jacky-s-portfolio.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '543136222604',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:543136222604:web:5dd0e2d1f0244e7ab61aa9',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-Y9TSSYV5YJ',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let cachedAuth = null;
let cachedDb = null;

function getAppInstance() {
  const existing = getApps();
  return existing.length ? existing[0] : initializeApp(firebaseConfig);
}

/** Auth is client-only; SSR returns null so prerendering never touches the SDK. */
export function getClientAuth() {
  if (!isFirebaseConfigured || typeof window === 'undefined') return null;
  if (!cachedAuth) {
    cachedAuth = getAuth(getAppInstance());
    // Keep the session in localStorage so it survives reloads and OAuth round-trips.
    setPersistence(cachedAuth, browserLocalPersistence).catch(() => {});
  }
  return cachedAuth;
}

export function getClientDb() {
  if (!isFirebaseConfigured || typeof window === 'undefined') return null;
  if (!cachedDb) cachedDb = getFirestore(getAppInstance());
  return cachedDb;
}
