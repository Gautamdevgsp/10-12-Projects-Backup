import { db } from "./Firebase";
import { collection, addDoc, setDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import CompetitionResultModel from "../models/CompetitionResult";

const collectionName = "competition_results";

class CompetitionResultService {
  async add(data) {
    const newItem = new CompetitionResultModel();
    newItem.competitionId = data.competitionId;
    newItem.competitionName = data.competitionName || "";
    newItem.studentName = data.studentName;
    newItem.position = data.position;
    newItem.prize = data.prize || "";
    newItem.created_at = data.created_at || new Date().toISOString();
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

  async getByCompetition(competitionId) {
    const q = query(collection(db, collectionName), where("competitionId", "==", competitionId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getSingle(id) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
    return null;
  }

  async update(id, data) { return await updateDoc(doc(db, collectionName, id), data); }
  async delete(id) { return await deleteDoc(doc(db, collectionName, id)); }
}

export default new CompetitionResultService();
