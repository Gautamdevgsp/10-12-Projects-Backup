import { db } from "./Firebase";
import {
  collection, addDoc, setDoc, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc,
} from "firebase/firestore";
import BookingModel from "../models/Order";

const collectionName = "bookings";

class BookingService {
  async add(data) {
    const newItem = new BookingModel();
    newItem.userId = data.userId;
    newItem.userName = data.userName;
    newItem.email = data.email;
    newItem.contact = data.contact || "";
    newItem.tableId = data.tableId;
    newItem.tableNumber = data.tableNumber;
    newItem.bookingDate = data.bookingDate;
    newItem.startTime = data.startTime;
    newItem.endTime = data.endTime;
    newItem.numberOfGuests = data.numberOfGuests || "";
    newItem.totalHours = data.totalHours || "";
    newItem.totalAmount = data.totalAmount || "";
    newItem.paymentStatus = data.paymentStatus || "Pending";
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

  async getByStatus(bookingStatus) {
    return this.all({ bookingStatus });
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

  async delete(id) {
    return await deleteDoc(doc(db, collectionName, id));
  }

  async checkTimeConflict(tableId, bookingDate, startTime, endTime) {
    const bookings = await this.all({ tableId, bookingDate });
    return bookings.filter((b) =>
      (b.bookingStatus === "Pending" || b.bookingStatus === "Accepted") &&
      b.startTime < endTime && b.endTime > startTime
    );
  }
}

export default new BookingService();
