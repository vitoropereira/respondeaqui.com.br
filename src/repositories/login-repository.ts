import firebase from 'firebase/compat/app'

export interface LoginRepository {
  googlePopup: () => Promise<firebase.auth.UserCredential>
  githubPopup: () => Promise<firebase.auth.UserCredential>
}
