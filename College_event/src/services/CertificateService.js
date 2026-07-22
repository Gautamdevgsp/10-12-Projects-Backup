import { db } from "./Firebase";
import { collection, addDoc, setDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import CertificateModel from "../models/Certificate";

const collectionName = "certificates";

class CertificateService {
  async add(data) {
    const newItem = new CertificateModel();
    newItem.certificateNo = data.certificateNo || "CERT-" + Date.now();
    newItem.studentId = data.studentId;
    newItem.studentName = data.studentName;
    newItem.competitionId = data.competitionId;
    newItem.competitionName = data.competitionName || "";
    newItem.eventId = data.eventId;
    newItem.eventName = data.eventName || "";
    newItem.position = data.position;
    newItem.eventDate = data.eventDate || "";
    newItem.eventTime = data.eventTime || "";
    newItem.venue = data.venue || "";
    newItem.issueDate = data.issueDate || new Date().toISOString();
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
    q = query(q, orderBy("issueDate", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getByStudent(studentId) { return this.all({ studentId }); }
  async getByCompetition(competitionId) { return this.all({ competitionId }); }

  async getSingle(id) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
    return null;
  }

  async update(id, data) { return await updateDoc(doc(db, collectionName, id), data); }
  async delete(id) { return await deleteDoc(doc(db, collectionName, id)); }
}

export default new CertificateService();
