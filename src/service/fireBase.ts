import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";
import "firebase/compat/firestore";

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
