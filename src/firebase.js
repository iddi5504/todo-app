import { initializeApp } from "firebase/app"
import {collection} from "firebase/firestore";
import {getFirestore , connectFirestoreEmulator}  from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBuMhYdNDxrBjr5TsyAy02h9Ee1tvQrQ8M",
    authDomain: "test-1f957.firebaseapp.com",
    projectId: "test-1f957",
    storageBucket: "test-1f957.appspot.com",
    messagingSenderId: "684367844550",
    appId: "1:684367844550:web:81a53360b0657c65e833c7"
  };

initializeApp(firebaseConfig);


// initializing firestore
const database= getFirestore()
// set up collection
connectFirestoreEmulator(database, 'localhost', 4001);
const users=collection(database, "users");
// collect data from collection
export {users,database}


