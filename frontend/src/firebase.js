import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBeTJ2S-IjIdsbetUb446kZkJ5c9lh20iw",
    authDomain: "foodprocurements.firebaseapp.com",
    projectId: "foodprocurements",
    storageBucket: "foodprocurements.firebasestorage.app",
    messagingSenderId: "805493426093",
    appId: "1:805493426093:web:08d1afdd8618a3759ac324",
    measurementId: "G-CMP5NQJXH6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };