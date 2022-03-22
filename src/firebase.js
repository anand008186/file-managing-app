
import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage';
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDnI6oslVnU2bzCqZS_GZFzMvU6MfoqAbc",
  authDomain: "file-managing-app.firebaseapp.com",
  projectId: "file-managing-app",
  storageBucket: "file-managing-app.appspot.com",
  messagingSenderId: "1049544549278",
  appId: "1:1049544549278:web:ac0b87e898e6b3051d6c8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
export {storage ,auth , app as default};