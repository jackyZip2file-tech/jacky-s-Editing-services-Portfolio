'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getClientAuth, isFirebaseConfigured, OWNER_EMAIL } from '@/lib/firebase';

const AuthContext = createContext({
  user: null,
  isOwner: false,
  loading: true,
  configured: false,
  error: '',
  signIn: async () => {},
  signOutUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    // Handle return from signInWithRedirect
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((err) => {
        console.warn('Firebase redirect result:', err?.code, err?.message);
        if (err?.code === 'auth/unauthorized-domain') {
          const domain = typeof window !== 'undefined' ? window.location.hostname : 'current domain';
          setError(
            `Domain "${domain}" is not authorized for OAuth in Firebase Console. Add it in Firebase Console -> Authentication -> Settings -> Authorized domains.`
          );
        } else if (err?.code && err.code !== 'auth/null-user') {
          setError(err?.message || 'Authentication failed');
        }
      });

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      },
      (err) => {
        setError(err?.message || 'Auth failed');
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const signIn = useCallback(async () => {
    const auth = getClientAuth();
    if (!auth) {
      setError('Firebase is not configured yet. Add your keys to .env.local.');
      return;
    }
    setError('');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Attempt popup sign-in first
      await signInWithPopup(auth, provider);
    } catch (popupErr) {
      console.warn('Popup sign-in encountered an error:', popupErr?.code, popupErr?.message);

      // Clean fallback: if signInWithPopup fails due to unauthorized domain, popup blockers,
      // COOP policy or cross-origin restrictions, gracefully fallback to signInWithRedirect
      try {
        await signInWithRedirect(auth, provider);
        return;
      } catch (redirectErr) {
        console.error('Redirect sign-in fallback failed:', redirectErr);
        if (
          redirectErr?.code === 'auth/unauthorized-domain' ||
          popupErr?.code === 'auth/unauthorized-domain'
        ) {
          const domain = typeof window !== 'undefined' ? window.location.hostname : 'current domain';
          setError(
            `Domain "${domain}" is not authorized in Firebase Console. Go to Firebase Console -> Authentication -> Settings -> Authorized domains and add "${domain}".`
          );
        } else {
          setError(redirectErr?.message || popupErr?.message || 'Sign-in failed. Please try again.');
        }
      }
    }
  }, []);

  const signOutUser = useCallback(async () => {
    const auth = getClientAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
  }, []);

  const isOwner = Boolean(user?.email && user.email.toLowerCase() === OWNER_EMAIL.toLowerCase());

  const value = useMemo(
    () => ({ user, isOwner, loading, configured: isFirebaseConfigured, error, signIn, signOutUser }),
    [user, isOwner, loading, error, signIn, signOutUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
