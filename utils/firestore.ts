// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY, // Changed from FIRESTORE_API_KEY
//   authDomain: process.env.FIREBASE_AUTHDOMAIN, // Changed from FIRESTORE_AUTH_DOMAIN
//   projectId: process.env.FIREBASE_PROJECT_ID, // Remains the same
//   storageBucket: process.env.FIREBASE_STOREBUCKET, // Changed from FIRESTORE_STOREBUCKET
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Changed from FIRESTORE_MESSAGING_SENDER_ID
//   appId: process.env.FIREBASE_APP_ID, // Changed from FIRESTORE_APP_ID
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID, // Changed from FIRESTORE_MEASUREMENT_ID
// };


// Initialize Firebase

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: ReturnType<typeof getFirestore> = getFirestore(app);


export { db };
