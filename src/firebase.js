import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,

} from 'firebase/firestore';
import { 
  getAuth,
  connectAuthEmulator
} from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBuMhYdNDxrBjr5TsyAy02h9Ee1tvQrQ8M",
    authDomain: "test-1f957.firebaseapp.com",
    projectId: "test-1f957",
    storageBucket: "test-1f957.appspot.com",
    messagingSenderId: "684367844550",
    appId: "1:684367844550:web:81a53360b0657c65e833c7"
  };
// initialze firebase app instance
initializeApp(firebaseConfig)
// initialize firestore instance
const firestore=getFirestore()
// set up emulator for firestore
connectFirestoreEmulator(firestore,"localhost",4001)
// initialize authentication
const auth=getAuth()
// set up emulator for authentication
connectAuthEmulator(auth,"http://localhost:9099")

// export instances
export {
  auth,
  firestore
}