import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";

class UserServices {
  async Google() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const uid = result.user.uid;
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const newUser = { name: result.user.displayName || result.user.email, email: result.user.email, status: true, usertype: 2 };
      await setDoc(userRef, newUser);
      sessionStorage.setItem("user", JSON.stringify({ id: uid, ...newUser }));
      return 2;
    }
    const userData = { id: uid, ...snap.data() };
    sessionStorage.setItem("user", JSON.stringify(userData));
    return snap.data().usertype;
  }
}

export default new UserServices();
