import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

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
export const storage = firebase.storage();

export const getUserInfo = async uid => {
	if (!uid) return null;
	try {
		return firestore.collection('users').doc(uid);
	} catch (error) {
		console.log('Error fetching user', error.message);
	}
};

export const createUserProfileDocument = async (user, additionalData) => {
  if(!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if(!snapshot.exists){
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      }); 
    } catch (error) {
      console.log("Error creating user : ",error.message);
    }
  }

  return getUserInfo(user.uid);
}

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;