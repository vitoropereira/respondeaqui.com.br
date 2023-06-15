import firebase from 'firebase/compat/app'
import { LoginRepository } from '../login-repository'

import 'firebase/compat/auth'

import { firebaseApp } from '../../service/fireBase'

export class FirebaseLoginRepository implements LoginRepository {
  async googlePopup() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await firebaseApp.auth().signInWithPopup(provider)
    return result
  }

  async githubPopup() {
    const provider = new firebase.auth.GithubAuthProvider()
    const result = await firebaseApp.auth().signInWithPopup(provider)
    return result
  }
}
