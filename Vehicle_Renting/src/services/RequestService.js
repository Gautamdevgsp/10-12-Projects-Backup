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
import RequestModel from "../models/Request";

const collectionName = "requests";

class RequestService {
  async add(data) {
    const newItem = new RequestModel();
    newItem.userId = data.userId;
    newItem.userName = data.userName;
    newItem.email = data.email;
    newItem.contact = data.contact;
    newItem.vehicleId = data.vehicleId;
    newItem.vehicleName = data.vehicleName;
    newItem.fromDate = data.fromDate;
    newItem.toDate = data.toDate;
    newItem.totalDays = data.totalDays;
    newItem.totalAmount = data.totalAmount;
    newItem.requestStatus = data.requestStatus || "Pending";
    newItem.paymentStatus = data.paymentStatus || "Pending";
    newItem.returnStatus = data.returnStatus || "Pending";
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

  async updateRequestStatus(id, requestStatus) {
    return await updateDoc(doc(db, collectionName, id), { requestStatus });
  }

  async updatePaymentStatus(id, paymentStatus) {
    return await updateDoc(doc(db, collectionName, id), { paymentStatus });
  }

  async updateReturnStatus(id, returnStatus) {
    return await updateDoc(doc(db, collectionName, id), { returnStatus });
  }

  async updateStatus(id, status) {
    return await updateDoc(doc(db, collectionName, id), { requestStatus: status });
  }

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

export default new RequestService();
