import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCopqS8z1Q__mrGTQ1FsumX4Oq8stf45Ds",
  authDomain: "zaigham-blog-d4ba5.firebaseapp.com",
  projectId: "zaigham-blog-d4ba5",
  storageBucket: "zaigham-blog-d4ba5.firebasestorage.app",
  messagingSenderId: "926264449507",
  appId: "1:926264449507:web:e71d287b8f6d9bfcc468d6",
  measurementId: "G-G1DGXMX51J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export default app;