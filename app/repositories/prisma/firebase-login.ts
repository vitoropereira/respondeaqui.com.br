import firebase from 'firebase/compat'
import { LoginRepository } from '../login-repository'
import { firebaseApp } from '@/app/service/fireBase'

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
