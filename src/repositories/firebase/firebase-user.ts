import { UserProps, UserRepository } from "../user-repository";
import { collection, addDoc } from "firebase/firestore";

import "firebase/compat/auth";
import { db } from "../../service/fireBase";

export class FirebaseUserRepository implements UserRepository {
  async addUser(user: UserProps) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: user.name,
        avatar: user.avatar,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
