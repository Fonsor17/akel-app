import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth" // for authentication

const firebaseConfig = {
  apiKey: "AIzaSyBEEwtVRUvEDsHKoqW_7QhM3EYvPNM-xog",
  authDomain: "akel-7e8e1.firebaseapp.com",
  projectId: "akel-7e8e1",
  storageBucket: "akel-7e8e1.appspot.com",
  messagingSenderId: "140864349670",
  appId: "1:140864349670:web:9cdedc52273227b6582227"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

export { db, auth }
