import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCRTJY2QWGOwIP4jHeM6veWAfyBJ2CFopc",
  authDomain: "plyship.firebaseapp.com",
  projectId: "plyship",
  storageBucket: "plyship.firebasestorage.app",
  messagingSenderId: "604217612658",
  appId: "1:604217612658:web:822ae4e77ddcc75ff665eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 