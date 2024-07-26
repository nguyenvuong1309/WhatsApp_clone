import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBE2Hm1zZ4JQc3TrBB9aFKfLfIAQTJEfIo',
  authDomain: 'vuong-561c7.firebaseapp.com',
  projectId: 'vuong-561c7',
  storageBucket: 'vuong-561c7.appspot.com',
  messagingSenderId: '856264269677',
  appId: '1:856264269677:web:5cc9462a1315cf08680464',
  measurementId: 'G-ST3E2BHHZE',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
