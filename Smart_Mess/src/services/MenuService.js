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
import MenuModel from "../models/Menu";

const collectionName = "menus";

class MenuService {
  async add(data) {
    const newItem = new MenuModel();
    newItem.categoryId = data.categoryId;
    newItem.categoryName = data.categoryName || "";
    newItem.name = data.name;
    newItem.description = data.description;
    newItem.price = data.price;
    newItem.imageUrl = data.imageUrl || "";
    newItem.status = data.status || "active";
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

  async getActive() {
    return this.all({ status: "active" });
  }

  async getByCategory(categoryId) {
    return this.all({ categoryId, status: "active" });
  }

  async getSingle(id) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  }

  async update(id, data) {
    const updateData = { ...data };
    if (data.imageUrl !== undefined) {
      updateData.imageUrl = data.imageUrl;
    }
    return await updateDoc(doc(db, collectionName, id), updateData);
  }

  async updateStatus(id, status) {
    return await updateDoc(doc(db, collectionName, id), { status });
  }

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

export default new MenuService();
