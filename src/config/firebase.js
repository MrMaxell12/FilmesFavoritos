import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAI, getGenerativeModel, GoogleAIBackend  } from "firebase/ai";

const firebaseConfig = {
  apiKey: "AIzaSyDSmi3hzCkK_uVAZvn0ob1oU_7ukLoAtRM",
  authDomain: "meuappreact-d5b12.firebaseapp.com",
  projectId: "meuappreact-d5b12",
  storageBucket: "meuappreact-d5b12.firebasestorage.app",
  messagingSenderId: "424548992176",
  appId: "1:424548992176:web:543126cb88b0007bed2775",
  measurementId: "G-GLRT6KHE5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
const ai = getAI(app, { backend: new GoogleAIBackend({ apiKey: firebaseConfig.apiKey })});
export const model = getGenerativeModel(ai, {model: "gemini-2.5-flash"});