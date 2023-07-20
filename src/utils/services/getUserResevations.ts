import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase";
import { ReservationData } from "../../types/types";

export async function getUserResevations(uid?: string, isAdmin?: boolean) {
  const firestore = getFirestore(app);
  const reservationsRef = await collection(firestore, "reservations");

  const q = isAdmin
    ? reservationsRef
    : query(reservationsRef, where("uid", "==", uid));
  const reservationList: Partial<ReservationData>[] = [];
  try {
    const snapshot = await getDocs(q);

    snapshot.docs.forEach((doc) => {
      reservationList.push({ ...doc.data() });
    });
  } catch (err) {
    console.log(err);
  }
  return reservationList;
}
