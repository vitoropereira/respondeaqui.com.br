import firebase from "firebase/compat/app";
import { LoginRepository } from "../login-repository";

import "firebase/compat/auth";

import { firebaseApp } from "../../service/fireBase";

export class FirebaseLoginRepository implements LoginRepository {
  async googlePopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    let result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  }

  async githubPopup() {
    const provider = new firebase.auth.GithubAuthProvider();
    let result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  }
}
