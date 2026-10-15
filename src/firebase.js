// Firebase configuration with offline-first fallback engine
// Allows Prajith to use the app immediately via LocalStorage,
// or connect real Firebase Auth & Cloud Firestore seamlessly anytime.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot 
} from 'firebase/firestore';

// Get credentials from localStorage or environment
export function getStoredFirebaseConfig() {
  try {
    const customConfig = localStorage.getItem('prajith_firebase_config');
    if (customConfig) {
      return JSON.parse(customConfig);
    }
  } catch (e) {
    console.warn('Error reading stored Firebase config', e);
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
  };
}

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

const config = getStoredFirebaseConfig();
const isConfigValid = Boolean(config.apiKey && config.projectId);

if (isConfigValid) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
}

export { app, auth, db, googleProvider, isConfigValid };

// Real or Simulated Sign In
export async function loginWithGoogle() {
  if (auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Firebase Google Auth error:", error);
      throw error;
    }
  } else {
    // Offline/Local mock user for Shri Prajith S
    const mockUser = {
      uid: 'prajith_vsb_2024_2028',
      displayName: 'Shri Prajith S',
      email: 'prajith.vsb.aiml@gmail.com',
      photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=Prajith',
      isLocalMock: true
    };
    localStorage.setItem('prajith_user', JSON.stringify(mockUser));
    return mockUser;
  }
}

export async function logoutUser() {
  if (auth) {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn(e);
    }
  }
  localStorage.removeItem('prajith_user');
}
