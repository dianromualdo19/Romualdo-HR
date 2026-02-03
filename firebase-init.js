import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSKTwGwAb-h7sNyEYt68KrLjZhWNPuRSs",
  authDomain: "romualdo-hr.firebaseapp.com",
  databaseURL: "https://romualdo-hr-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "romualdo-hr",
  storageBucket: "romualdo-hr.firebasestorage.app",
  messagingSenderId: "317346985608",
  appId: "1:317346985608:web:2efe893bfb373ec127513d",
  measurementId: "G-QCED940S65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export these so login.html can see them
export const auth = getAuth(app);
export const db = getDatabase(app);