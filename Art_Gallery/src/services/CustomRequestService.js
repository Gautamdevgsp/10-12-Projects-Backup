import { db } from "./Firebase";
import {
  collection, addDoc, setDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc,
} from "firebase/firestore";
import CustomRequestModel from "../models/CustomRequest";

const collectionName = "customRequests";

class CustomRequestService {
  async add(data) {
    const newItem = new CustomRequestModel();
    newItem.userId = data.userId;
    newItem.userName = data.userName;
    newItem.email = data.email;
    newItem.contact = data.contact || "";
    newItem.paintingTitle = data.paintingTitle || "";
    newItem.description = data.description;
    newItem.referenceImage = data.referenceImage || "";
    newItem.budget = data.budget || "";
    newItem.expectedDeliveryDate = data.expectedDeliveryDate || "";
    newItem.requestStatus = data.requestStatus || "Pending";
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

  async updateStatus(id, requestStatus) {
    return await updateDoc(doc(db, collectionName, id), { requestStatus });
  }

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

export default new CustomRequestService();
