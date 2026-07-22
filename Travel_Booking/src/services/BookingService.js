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
import BookingModel from "../models/Booking";

const collectionName = "bookings";

class BookingService {
  async add(data) {
    const newItem = new BookingModel();
    newItem.packageId = data.packageId;
    newItem.packageName = data.packageName;
    newItem.userId = data.userId;
    newItem.userName = data.userName;
    newItem.email = data.email;
    newItem.contact = data.contact;
    newItem.travelDate = data.travelDate;
    newItem.persons = data.persons;
    newItem.amount = data.amount;
    newItem.paymentStatus = data.paymentStatus || "Paid";
    newItem.bookingStatus = data.bookingStatus || "Pending";
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

  async getByStatus(status) {
    return this.all({ bookingStatus: status });
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

  async updateBookingStatus(id, bookingStatus) {
    return await updateDoc(doc(db, collectionName, id), { bookingStatus });
  }

  async updatePaymentStatus(id, paymentStatus) {
    return await updateDoc(doc(db, collectionName, id), { paymentStatus });
  }

  async updateStatus(id, status) {
    return await updateDoc(doc(db, collectionName, id), { bookingStatus: status });
  }

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }
}

export default new BookingService();
