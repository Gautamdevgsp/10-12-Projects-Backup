import { db } from "./Firebase";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import PackageRequestModel from "../models/PackageRequest";

const collectionName = "package_requests";

class PackageRequestService {
  async add(data) {
    const newItem = new PackageRequestModel();
    newItem.userId = data.userId;
    newItem.userName = data.userName;
    newItem.email = data.email;
    newItem.contact = data.contact;
    newItem.destination = data.destination;
    newItem.budget = data.budget;
    newItem.days = data.days;
    newItem.requirements = data.requirements;
    newItem.status = data.status || "Pending";
    newItem.createdAt = data.createdAt || new Date().toISOString();
    const docRef = await addDoc(collection(db, collectionName), { ...newItem });
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

  async getByUser(userId) {
    return this.all({ userId });
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
}

export default new PackageRequestService();
