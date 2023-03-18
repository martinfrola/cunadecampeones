import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDajAmxhw-LgzDKfZqAJIdlKXdJbTyGxQs",
  authDomain: "suenosdorados-5bc21.firebaseapp.com",
  projectId: "suenosdorados-5bc21",
  storageBucket: "suenosdorados-5bc21.appspot.com",
  messagingSenderId: "39909296924",
  appId: "1:39909296924:web:74d97f6549581956fe48d9",
  measurementId: "G-0C9D8PY47G",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
