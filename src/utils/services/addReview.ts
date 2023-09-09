import "firebase/firestore";
import { addDoc, Firestore } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../firebase";
import {
  getCurrentDate,
  numberToWord,
} from "../helperFunctions/helperFunctions";

export async function addReview(
  name: string,
  title: string,
  comment: string,
  rating: number,
  uid: string,
  photoURL: string | null
) {
  const firestore = getFirestore(app);
  const reservationsRef = await collection(firestore, "reviews");
  const doc = {
    author: name,
    authorPhotoUrl: photoURL,
    date: getCurrentDate(),
    uid: uid,
    header: title,
    content: comment,
    stars: numberToWord(rating),
  };
  try {
    await addDoc(reservationsRef, doc);
    window.location.reload();
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
