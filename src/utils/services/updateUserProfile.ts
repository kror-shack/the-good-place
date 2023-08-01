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
    console.log(docIds);
    const userDocRef = doc(firestore, "users", docIds);
    console.log(updatedUserFeilds);
    if (Object.keys(updatedUserFeilds).length > 0) {
      console.log("going to update");
      await updateDoc(userDocRef, updatedFeilds);
      console.log("User profile updated successfully.");
    } else {
      console.log("No changes to update.");
    }
  } catch (error) {
    console.error(error);
  }
}

export {};
