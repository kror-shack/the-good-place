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

export async function fetchUserPhoneNumber(uid?: string, isAdmin?: boolean) {
  const firestore = getFirestore(app);
  const reservationsRef = await collection(firestore, "users");

  const q = isAdmin
    ? reservationsRef
    : query(reservationsRef, where("uid", "==", uid));
  const reservationList: Partial<number>[] = [];
  try {
    const snapshot = await getDocs(q);

    snapshot.docs.forEach((doc) => {
      console.log(`this is the doc data: ${doc.data().phoneNumber}`);
      reservationList.push(doc.data().phoneNumber);
    });
  } catch (err) {
    console.log(err);
  }
  return reservationList;
}
