import { getApps, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/** The only account allowed to write to Firestore. Must match firestore.rules exactly. */
export const OWNER_EMAIL = 'anaflousoussama666@gmail.com';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

/**
 * True only when the three values required by Firebase Auth are present.
 * The public site renders fine without them; the admin panel shows a setup notice instead.
 */
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
