import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase";
import { AddressData } from "../../types/types";

type UserProfile = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: number | string | null;
  address: AddressData;
};

export default async function getUserProfile(
  userName: string,
  userUid: string
) {
  const nameParts = userName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");
  const firestore = getFirestore(app);
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("uid", "==", userUid));
  try {
    const snapshot = await getDocs(q);
    const userData = snapshot.docs[0].data() as UserProfile;
    const updatedUserProfile: UserProfile = {
      ...userData,
      firstName: firstName,
      lastName: lastName,
    };
    return updatedUserProfile;
  } catch (err) {
    console.log(err);
    return null;
  }
}
