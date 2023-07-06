// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8UTCbWS3P2FHDpLXFG07yTQmalAa8EHw",
  authDomain: "crowdfundingcapstone.firebaseapp.com",
  projectId: "crowdfundingcapstone",
  storageBucket: "crowdfundingcapstone.appspot.com",
  messagingSenderId: "312824414413",
  appId: "1:312824414413:web:ad1d445759277801dc6984",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
