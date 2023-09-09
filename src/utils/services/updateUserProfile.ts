import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "../../firebase";
import { UserData } from "../../types/types";

export default async function updateUserProfile(
  updatedFeilds: Partial<UserData>,
  userUid: string
) {
  const { firstName, lastName, email, ...updatedUserFeilds } = updatedFeilds;
  const firestore = getFirestore(app);
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("uid", "==", userUid));

  try {
    const snapshot = await getDocs(q);
    const docIds = snapshot.docs[0].id;
    const userDocRef = doc(firestore, "users", docIds);
    if (Object.keys(updatedUserFeilds).length > 0) {
      await updateDoc(userDocRef, updatedFeilds);
    } else {
    }
  } catch (error) {
    console.error(error);
  }
}

export {};
