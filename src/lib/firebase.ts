"use client";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
let firebaseApp: FirebaseApp | null = null;

export function initFirebase() {
  if (typeof window === "undefined") return null;
  if (getApps().length > 0) {
    firebaseApp = getApps()[0];
    return firebaseApp;
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;

  if (!apiKey || !authDomain || !projectId || !appId) {
    console.warn("Firebase environment variables are not fully provided.");
  }

  const config = {
    apiKey,
    authDomain,
    projectId,
    appId,
    messagingSenderId,
  };

  firebaseApp = initializeApp(config);
  return firebaseApp;
}

export function getFirebaseAuth() {
  if (!firebaseApp) initFirebase();
  if (!firebaseApp) return null;
  return getAuth(firebaseApp);
}
