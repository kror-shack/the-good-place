import "firebase/firestore";
import { addDoc, Firestore } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../firebase";

export async function addReservation(
  email: string,
  name: string,
  time: string,
  date: string,
  people: number,
  uid: string,
  number: number | null,
  request: string | null
) {
  const firestore = getFirestore(app);
  const reservationsRef = await collection(firestore, "reservations");
  const doc = {
    email: email,
    name: name,
    time: time,
    date: date,
    people: people,
    uid: uid,
    number: number,
    request: request,
  };
  try {
    await addDoc(reservationsRef, doc);
    console.log("added");
    return true;
  } catch (error) {
    console.error("Error sending message:", error);
  }
  return false;
}
