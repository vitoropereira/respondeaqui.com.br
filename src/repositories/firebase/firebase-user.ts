import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import "firebase/compat/auth";
import { v4 as uuidv4 } from "uuid";

import { UserRepository } from "../user-repository";
import { db } from "../../service/fireBase";

interface UserProps {
  userId: string;
  name: string;
  avatar: string;
  email: string;
}

export class FirebaseUserRepository implements UserRepository {
  async addUser(user: UserProps) {
    try {
      const newId = uuidv4();
      const docRef = await addDoc(collection(db, "users"), {
        userId: newId,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async findUserByEmail(email: string) {
    try {
      let user: UserProps;
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        user = doc.data() as UserProps;
      });

      if (user) {
        return user;
      }

      return undefined;
    } catch (e) {
      console.error("Error adding document: ", e);
      return undefined;
    }
  }
}
