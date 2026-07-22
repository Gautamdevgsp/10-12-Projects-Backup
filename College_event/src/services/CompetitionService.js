import { db } from "./Firebase";
import { collection, addDoc, setDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import CompetitionModel from "../models/Competition";

const collectionName = "competitions";

class CompetitionService {
  async add(data) {
    const newItem = new CompetitionModel();
    newItem.eventId = data.eventId;
    newItem.eventName = data.eventName || "";
    newItem.title = data.title;
    newItem.description = data.description;
    newItem.venue = data.venue;
    newItem.capacity = data.capacity;
    newItem.prize = data.prize || "";
    newItem.competitionDate = data.competitionDate;
    newItem.competitionTime = data.competitionTime;
    newItem.image = data.image || "";
    newItem.status = data.status || "active";
    newItem.created_at = data.created_at || new Date().toISOString();
    newItem.updated_at = data.updated_at || new Date().toISOString();
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
    q = query(q, orderBy("competitionDate", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getActive() { return this.all({ status: "active" }); }

  async getByEvent(eventId) {
    const q = query(collection(db, collectionName), where("eventId", "==", eventId), orderBy("competitionDate", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getSingle(id) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
    return null;
  }

  async update(id, data) {
    data.updated_at = new Date().toISOString();
    return await updateDoc(doc(db, collectionName, id), data);
  }

  async updateStatus(id, status) {
    return await updateDoc(doc(db, collectionName, id), { status, updated_at: new Date().toISOString() });
  }

  async delete(id) { return await deleteDoc(doc(db, collectionName, id)); }
}

export default new CompetitionService();
