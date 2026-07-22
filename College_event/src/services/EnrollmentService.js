import { db } from "./Firebase";
import { collection, addDoc, setDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import EnrollmentModel from "../models/Enrollment";

const collectionName = "enrollments";

class EnrollmentService {
  async add(data) {
    const newItem = new EnrollmentModel();
    newItem.eventId = data.eventId;
    newItem.eventName = data.eventName || "";
    newItem.competitionId = data.competitionId;
    newItem.competitionName = data.competitionName || "";
    newItem.studentId = data.studentId;
    newItem.studentName = data.studentName || "";
    newItem.email = data.email || "";
    newItem.contact = data.contact || "";
    newItem.enrolledAt = data.enrolledAt || new Date().toISOString();
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
    q = query(q, orderBy("enrolledAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getByStudent(studentId) { return this.all({ studentId }); }
  async getByEvent(eventId) { return this.all({ eventId }); }
  async getByCompetition(competitionId) { return this.all({ competitionId }); }

  async checkExists(studentId, competitionId) {
    const q = query(
      collection(db, collectionName),
      where("studentId", "==", studentId),
      where("competitionId", "==", competitionId)
    );
    const snapshot = await getDocs(q);
    return snapshot.size > 0;
  }

  async getSingle(id) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
    return null;
  }

  async update(id, data) { return await updateDoc(doc(db, collectionName, id), data); }
  async delete(id) { return await deleteDoc(doc(db, collectionName, id)); }
}

export default new EnrollmentService();
