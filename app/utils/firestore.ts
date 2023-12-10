import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STOREBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: ReturnType<typeof getFirestore> = getFirestore(app);
// const analytics = getAnalytics(app);


// export { db, analytics };
export { db };
