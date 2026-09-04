"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { initFirebase, getFirebaseAuth } from "./firebase";

initFirebase();

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getFirebaseAuth();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub: () => void = onAuthStateChanged(auth, (u: User | null) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [auth]);

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn: async (email: string, password: string) => {
        if (!auth) throw new Error("Auth not initialized");
        await signInWithEmailAndPassword(auth, email, password);
      },
      signUp: async (email: string, password: string) => {
        if (!auth) throw new Error("Auth not initialized");
        await createUserWithEmailAndPassword(auth, email, password);
      },
      signOut: async () => {
        if (!auth) return;
        await firebaseSignOut(auth);
      },
    }),
    [auth, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
