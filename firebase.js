import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc,getDocs ,doc, setDoc,updateDoc,serverTimestamp , arrayUnion, arrayRemove ,deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyCBj61ozUOQYwyOeDrYitLElAzUaK3Kzfk",
  authDomain: "myfirst-webapp.firebaseapp.com",
  projectId: "myfirst-webapp",
  storageBucket: "myfirst-webapp.firebasestorage.app",
  messagingSenderId: "862813763911",
  appId: "1:862813763911:web:08072b25920d1bd921b462",
  measurementId: "G-LFC2EYVYQQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth,getAuth ,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider,provider,getFirestore,db ,collection, addDoc,getDocs, doc, setDoc ,updateDoc,serverTimestamp, arrayUnion, arrayRemove,deleteDoc }
