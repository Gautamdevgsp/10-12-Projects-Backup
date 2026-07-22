import { db } from "./Firebase";
import {
  collection, addDoc, setDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc,
} from "firebase/firestore";
import TableModel from "../models/Menu";

const collectionName = "tables";

class TableService {
  async add(data) {
    const newItem = new TableModel();
    newItem.tableNumber = data.tableNumber;
    newItem.capacity = data.capacity;
    newItem.ratePerHour = data.ratePerHour || "";
    newItem.imageUrl = data.imageUrl || "";
    newItem.categoryId = data.categoryId || "";
    newItem.categoryName = data.categoryName || "";
    newItem.status = data.status || "available";
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

  async getAvailable() {
    return this.all({ status: "available" });
  }

  async getByCategory(categoryId) {
    return this.all({ categoryId });
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

export default new TableService();
