import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { db } from "./Firebase";

// ===================== EVENTS =====================

// Create Event
export const createEvent = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      ...eventData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    return { id: docRef.id, ...eventData };
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Get all events
export const getAllEvents = async () => {
  try {
    const q = query(collection(db, "events"), orderBy("eventDate", "asc"));
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
};

// Get active events only
export const getActiveEvents = async () => {
  try {
    const q = query(
      collection(db, "events"),
      where("status", "==", "active")
    );
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    events.sort((a, b) => (a.eventDate || "").localeCompare(b.eventDate || ""));
    return events;
  } catch (error) {
    console.error("Error getting active events:", error);
    throw error;
  }
};

// Get single event
export const getEventById = async (eventId) => {
  try {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting event:", error);
    throw error;
  }
};

// Update event
export const updateEvent = async (eventId, eventData) => {
  try {
    const docRef = doc(db, "events", eventId);
    await updateDoc(docRef, {
      ...eventData,
      updated_at: new Date().toISOString()
    });
    return { id: eventId, ...eventData };
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Delete event
export const deleteEvent = async (eventId) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// ===================== COMPETITIONS =====================

// Create Competition
export const createCompetition = async (competitionData) => {
  try {
    const docRef = await addDoc(collection(db, "competitions"), {
      ...competitionData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    return { id: docRef.id, ...competitionData };
  } catch (error) {
    console.error("Error creating competition:", error);
    throw error;
  }
};

// Get all competitions
export const getAllCompetitions = async () => {
  try {
    const q = query(collection(db, "competitions"), orderBy("competitionDate", "asc"));
    const querySnapshot = await getDocs(q);
    const competitions = [];
    querySnapshot.forEach((doc) => {
      competitions.push({ id: doc.id, ...doc.data() });
    });
    return competitions;
  } catch (error) {
    console.error("Error getting competitions:", error);
    throw error;
  }
};

// Get competitions by event ID
export const getCompetitionsByEventId = async (eventId) => {
  try {
    const q = query(
      collection(db, "competitions"),
      where("eventId", "==", eventId)
    );
    const querySnapshot = await getDocs(q);
    const competitions = [];
    querySnapshot.forEach((doc) => {
      competitions.push({ id: doc.id, ...doc.data() });
    });
    competitions.sort((a, b) => (a.competitionDate || "").localeCompare(b.competitionDate || ""));
    return competitions;
  } catch (error) {
    console.error("Error getting competitions by event:", error);
    throw error;
  }
};

// Get single competition
export const getCompetitionById = async (competitionId) => {
  try {
    const docRef = doc(db, "competitions", competitionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting competition:", error);
    throw error;
  }
};

// Update competition
export const updateCompetition = async (competitionId, competitionData) => {
  try {
    const docRef = doc(db, "competitions", competitionId);
    await updateDoc(docRef, {
      ...competitionData,
      updated_at: new Date().toISOString()
    });
    return { id: competitionId, ...competitionData };
  } catch (error) {
    console.error("Error updating competition:", error);
    throw error;
  }
};

// Delete competition
export const deleteCompetition = async (competitionId) => {
  try {
    await deleteDoc(doc(db, "competitions", competitionId));
    return true;
  } catch (error) {
    console.error("Error deleting competition:", error);
    throw error;
  }
};

// ===================== ENROLLMENTS =====================

// Create enrollment
export const createEnrollment = async (enrollmentData) => {
  try {
    const docRef = await addDoc(collection(db, "enrollments"), {
      ...enrollmentData,
      enrolledAt: new Date().toISOString()
    });
    return { id: docRef.id, ...enrollmentData };
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }
};

// Check if student already enrolled in competition
export const checkEnrollmentExists = async (studentId, competitionId) => {
  try {
    const q = query(
      collection(db, "enrollments"),
      where("studentId", "==", studentId),
      where("competitionId", "==", competitionId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  } catch (error) {
    console.error("Error checking enrollment:", error);
    throw error;
  }
};

// Get all enrollments
export const getAllEnrollments = async () => {
  try {
    const q = query(collection(db, "enrollments"), orderBy("enrolledAt", "desc"));
    const querySnapshot = await getDocs(q);
    const enrollments = [];
    querySnapshot.forEach((doc) => {
      enrollments.push({ id: doc.id, ...doc.data() });
    });
    return enrollments;
  } catch (error) {
    console.error("Error getting enrollments:", error);
    throw error;
  }
};

// Get enrollments by student ID
export const getEnrollmentsByStudentId = async (studentId) => {
  try {
    const q = query(
      collection(db, "enrollments"),
      where("studentId", "==", studentId)
    );
    const querySnapshot = await getDocs(q);
    const enrollments = [];
    querySnapshot.forEach((doc) => {
      enrollments.push({ id: doc.id, ...doc.data() });
    });
    enrollments.sort((a, b) => ((b.enrolledAt || "")).localeCompare(a.enrolledAt || ""));
    return enrollments;
  } catch (error) {
    console.error("Error getting student enrollments:", error);
    throw error;
  }
};

// Get enrollments by event ID
export const getEnrollmentsByEventId = async (eventId) => {
  try {
    const q = query(
      collection(db, "enrollments"),
      where("eventId", "==", eventId)
    );
    const querySnapshot = await getDocs(q);
    const enrollments = [];
    querySnapshot.forEach((doc) => {
      enrollments.push({ id: doc.id, ...doc.data() });
    });
    enrollments.sort((a, b) => ((b.enrolledAt || "")).localeCompare(a.enrolledAt || ""));
    return enrollments;
  } catch (error) {
    console.error("Error getting event enrollments:", error);
    throw error;
  }
};

// Get enrollments by competition ID
export const getEnrollmentsByCompetitionId = async (competitionId) => {
  try {
    const q = query(
      collection(db, "enrollments"),
      where("competitionId", "==", competitionId)
    );
    const querySnapshot = await getDocs(q);
    const enrollments = [];
    querySnapshot.forEach((doc) => {
      enrollments.push({ id: doc.id, ...doc.data() });
    });
    enrollments.sort((a, b) => ((b.enrolledAt || "")).localeCompare(a.enrolledAt || ""));
    return enrollments;
  } catch (error) {
    console.error("Error getting competition enrollments:", error);
    throw error;
  }
};

// Delete enrollment
export const deleteEnrollment = async (enrollmentId) => {
  try {
    await deleteDoc(doc(db, "enrollments", enrollmentId));
    return true;
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    throw error;
  }
};

// ===================== COMPETITION RESULTS =====================

// Add result
export const addResult = async (resultData) => {
  try {
    const docRef = await addDoc(collection(db, "competition_results"), {
      ...resultData,
      created_at: new Date().toISOString()
    });
    return { id: docRef.id, ...resultData };
  } catch (error) {
    console.error("Error adding result:", error);
    throw error;
  }
};

// Get results by competition ID
export const getResultsByCompetitionId = async (competitionId) => {
  try {
    const q = query(
      collection(db, "competition_results"),
      where("competitionId", "==", competitionId)
    );
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    results.sort((a, b) => (a.position || 0) - (b.position || 0));
    return results;
  } catch (error) {
    console.error("Error getting results:", error);
    throw error;
  }
};

// Update result
export const updateResult = async (resultId, resultData) => {
  try {
    const docRef = doc(db, "competition_results", resultId);
    await updateDoc(docRef, resultData);
    return { id: resultId, ...resultData };
  } catch (error) {
    console.error("Error updating result:", error);
    throw error;
  }
};

// Delete result
export const deleteResult = async (resultId) => {
  try {
    await deleteDoc(doc(db, "competition_results", resultId));
    return true;
  } catch (error) {
    console.error("Error deleting result:", error);
    throw error;
  }
};

// ===================== CERTIFICATES =====================

// Create certificate
export const createCertificate = async (certificateData) => {
  try {
    const docRef = await addDoc(collection(db, "certificates"), {
      ...certificateData,
      issueDate: new Date().toISOString()
    });
    return { id: docRef.id, ...certificateData };
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error;
  }
};

// Get certificates by student ID
export const getCertificatesByStudentId = async (studentId) => {
  try {
    const q = query(
      collection(db, "certificates"),
      where("studentId", "==", studentId)
    );
    const querySnapshot = await getDocs(q);
    const certificates = [];
    querySnapshot.forEach((doc) => {
      certificates.push({ id: doc.id, ...doc.data() });
    });
    certificates.sort((a, b) => ((b.issueDate || "")).localeCompare(a.issueDate || ""));
    return certificates;
  } catch (error) {
    console.error("Error getting certificates:", error);
    throw error;
  }
};

// Get certificates by competition ID
export const getCertificatesByCompetitionId = async (competitionId) => {
  try {
    const q = query(
      collection(db, "certificates"),
      where("competitionId", "==", competitionId)
    );
    const querySnapshot = await getDocs(q);
    const certificates = [];
    querySnapshot.forEach((doc) => {
      certificates.push({ id: doc.id, ...doc.data() });
    });
    certificates.sort((a, b) => ((b.issueDate || "")).localeCompare(a.issueDate || ""));
    return certificates;
  } catch (error) {
    console.error("Error getting competition certificates:", error);
    throw error;
  }
};

// Get all certificates
export const getAllCertificates = async () => {
  try {
    const q = query(collection(db, "certificates"), orderBy("issueDate", "desc"));
    const querySnapshot = await getDocs(q);
    const certificates = [];
    querySnapshot.forEach((doc) => {
      certificates.push({ id: doc.id, ...doc.data() });
    });
    return certificates;
  } catch (error) {
    console.error("Error getting all certificates:", error);
    throw error;
  }
};

// Delete certificate
export const deleteCertificate = async (certificateId) => {
  try {
    await deleteDoc(doc(db, "certificates", certificateId));
    return true;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error;
  }
};

// ===================== USERS =====================

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      ...userData,
      updated_at: new Date().toISOString()
    });
    return { uid: userId, ...userData };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ uid: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

// ===================== REPORTS/STATS =====================

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const eventsSnap = await getDocs(collection(db, "events"));
    const competitionsSnap = await getDocs(collection(db, "competitions"));
    const enrollmentsSnap = await getDocs(collection(db, "enrollments"));
    const certificatesSnap = await getDocs(collection(db, "certificates"));

    return {
      totalEvents: eventsSnap.size,
      totalCompetitions: competitionsSnap.size,
      totalEnrollments: enrollmentsSnap.size,
      totalCertificates: certificatesSnap.size
    };
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
};
