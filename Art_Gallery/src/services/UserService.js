import { db, auth } from "./Firebase";
import {
  collection, addDoc, setDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import UserModel from "../models/User";
import AuthServices from "../helpers/AuthServices";

const collectionName = "users";

class UserService {
  async add(data) {
    const newItem = new UserModel();
    newItem.uid = data.uid || "";
    newItem.name = data.name;
    newItem.email = data.email;
    newItem.contact = data.contact || "";
    newItem.address = data.address || "";
    newItem.userType = data.userType || 2;
    newItem.status = data.status || "active";
    newItem.created_at = data.created_at || new Date().toISOString();
    const docRef = data.uid
      ? doc(db, collectionName, data.uid)
      : await addDoc(collection(db, collectionName), { ...newItem });
    newItem.id = docRef.id;
    await setDoc(docRef, { ...newItem }, { merge: true });
    return newItem;
  }

  async all(payload) {
    let q = collection(db, collectionName);
    if (payload) {
      for (let key in payload) {
        q = query(q, where(key, "==", payload[key]));
      }
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getSingle(id) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  }

  async update(id, data) {
    return await updateDoc(doc(db, collectionName, id), data);
  }

  async updateStatus(id, status) {
    return await updateDoc(doc(db, collectionName, id), { status });
  }

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }

  async Login(email, password) {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      let userDoc = await getDoc(doc(db, collectionName, uid));
      let userData = userDoc.data();

      AuthServices.setData(userData, uid);

      if (userData.userType == 1) {
        return 1;
      } else {
        return 2;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async Google() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const uid = result.user.uid;
    const userRef = doc(db, collectionName, uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const newUser = new UserModel();
      newUser.uid = uid;
      newUser.name = result.user.displayName || result.user.email;
      newUser.email = result.user.email;
      newUser.userType = 2;
      newUser.status = "active";
      newUser.created_at = new Date().toISOString();
      await setDoc(userRef, { ...newUser });
      return { id: uid, ...newUser };
    }
    return { id: uid, ...snap.data() };
  }
}

export default new UserService();
