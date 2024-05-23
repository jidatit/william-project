import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiudKDj-Ypcgt_fKhw-RPUw8SqhZYJPTQ",
    authDomain: "william-project-71087.firebaseapp.com",
    projectId: "william-project-71087",
    storageBucket: "william-project-71087.appspot.com",
    messagingSenderId: "174941284945",
    appId: "1:174941284945:web:480dfbb80ee3458ecea670"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);