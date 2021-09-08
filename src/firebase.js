import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyAvsPXc0fflNmxJEt3HxunuMs1Of4kRMSM",
  authDomain: "think-piece-864e6.firebaseapp.com",
  projectId: "think-piece-864e6",
  storageBucket: "think-piece-864e6.appspot.com",
  messagingSenderId: "312127666380",
  appId: "1:312127666380:web:9970bbeb938d8fdbfc6a69",
  measurementId: "G-EH8418BYX6"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;