import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase";
import { AddressData, ReservationData } from "../../types/types";

type PromiseReturn = {
  address: AddressData;
  uid: string;
};

export async function fetchUserAddress(uid?: string, isAdmin?: boolean) {
  const firestore = getFirestore(app);
  const reservationsRef = await collection(firestore, "users");

  const q = isAdmin
    ? reservationsRef
    : query(reservationsRef, where("uid", "==", uid));
  const reservationList: AddressData[] = [];
  try {
    const snapshot = await getDocs(q);

    snapshot.docs.forEach((doc) => {
      reservationList.push({ ...doc.data().address });
    });
  } catch (err) {
    console.log(err);
  }
  return reservationList;
}
