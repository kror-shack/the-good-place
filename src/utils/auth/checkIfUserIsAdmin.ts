import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase";

const firestore = getFirestore(app);

export async function checkIfUserIsAdmin(uid: string) {
  const reservationsRef = await collection(firestore, "admin");
  const q = query(reservationsRef, where("uid", "==", uid));
  try {
    const docsJson = await getDocs(q);

    if (docsJson.docs.length > 0) {
      return true;
    }
  } catch (err) {
    return false;
  }
}
