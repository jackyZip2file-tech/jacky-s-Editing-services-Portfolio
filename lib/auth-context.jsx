'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
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
      await signInWithPopup(auth, provider);
    } catch (err) {
      // Popup blocked or COOP-restricted (common in Brave) — fall back to a full redirect.
      if (
        err?.code === 'auth/popup-blocked' ||
        err?.code === 'auth/popup-closed-by-user' ||
        err?.code === 'auth/cancelled-popup-request' ||
        err?.code === 'auth/operation-not-supported-in-this-environment'
      ) {
        try {
          await signInWithRedirect(auth, provider);
          return;
        } catch (redirectErr) {
          setError(redirectErr?.message || 'Sign-in failed');
          return;
        }
      }
      setError(err?.message || 'Sign-in failed');
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
