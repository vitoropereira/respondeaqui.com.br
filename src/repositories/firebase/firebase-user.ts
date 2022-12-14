import { UserRepository } from "../user-repository";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import "firebase/compat/auth";
import { db } from "../../service/fireBase";

interface UserProps {
  name: string;
  avatar: string;
  email: string;
}

export class FirebaseUserRepository implements UserRepository {
  async addUser(user: UserProps) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async findUSerByEmail(email: string) {
    try {
      let user = [];
      const userRef = collection(db, "users");
      // Create a query against the collection.
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        user.push(doc.data);
      });

      if (user.length > 0) {
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }
}
