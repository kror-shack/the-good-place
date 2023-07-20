import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase";
import { ReviewData } from "../../types/types";

export async function getReviews() {
  const firestore = getFirestore(app);

  const reviewRef = await collection(firestore, "reviews");
  const reviewList: Partial<ReviewData>[] = [];
  try {
    const snapshot = await getDocs(reviewRef);

    snapshot.docs.forEach((doc) => {
      reviewList.push({ ...doc.data() });
    });
  } catch (err) {
    console.log(err);
  }
  return reviewList;
}
