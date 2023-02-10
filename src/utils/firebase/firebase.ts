import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN3n30m6mkDH_gsg2gSSUb4cg4f_QjEck",
  authDomain: "chatgpt-messenger-clone-3ad52.firebaseapp.com",
  projectId: "chatgpt-messenger-clone-3ad52",
  storageBucket: "chatgpt-messenger-clone-3ad52.appspot.com",
  messagingSenderId: "401013629718",
  appId: "1:401013629718:web:3c15a6180efd3e609b2637",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
