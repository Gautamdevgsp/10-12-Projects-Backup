import { db } from "./Firebase";
import {
  collection, addDoc, setDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc,
} from "firebase/firestore";
import ArtworkModel from "../models/Artwork";

const collectionName = "artworks";

class ArtworkService {
  async add(data) {
    const newItem = new ArtworkModel();
    newItem.categoryId = data.categoryId || "";
    newItem.categoryName = data.categoryName || "";
    newItem.title = data.title;
    newItem.artistName = data.artistName || "";
    newItem.description = data.description || "";
    newItem.price = data.price || "";
    newItem.imageUrl = data.imageUrl || "";
    newItem.availability = data.availability || "Available";
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

  async getAvailable() {
    return this.all({ availability: "Available", status: "active" });
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
    return await updateDoc(doc(db, collectionName, id), data);
  }

  async updateStatus(id, status) {
    return await updateDoc(doc(db, collectionName, id), { status });
  }

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

export default new ArtworkService();
