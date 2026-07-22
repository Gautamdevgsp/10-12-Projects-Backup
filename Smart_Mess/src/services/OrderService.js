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
import OrderModel from "../models/Order";

const collectionName = "orders";

class OrderService {
  async add(data) {
    const newItem = new OrderModel();
    newItem.userId = data.userId;
    newItem.userName = data.userName;
    newItem.email = data.email;
    newItem.contact = data.contact;
    newItem.tokenNumber = data.tokenNumber;
    newItem.items = data.items || [];
    newItem.totalAmount = data.totalAmount;
    newItem.orderStatus = data.orderStatus || "Pending";
    newItem.paymentStatus = data.paymentStatus || "Unpaid";
    newItem.razorpayPaymentId = data.razorpayPaymentId || "";
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

  async getByToken(tokenNumber) {
    const q = query(collection(db, collectionName), where("tokenNumber", "==", tokenNumber));
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

  async updateOrderStatus(id, orderStatus) {
    return await updateDoc(doc(db, collectionName, id), { orderStatus });
  }

  async updatePaymentStatus(id, paymentStatus) {
    return await updateDoc(doc(db, collectionName, id), { paymentStatus });
  }

  async updateStatus(id, status) {
    return await updateDoc(doc(db, collectionName, id), { orderStatus: status });
  }

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

export default new OrderService();
