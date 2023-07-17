import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase";
import { RootState } from "../../store/store";
import { useCollection } from "react-firebase-hooks/firestore";
import "./ReviewPage.scss";
import StarRate from "@mui/icons-material/StarRate";

type ReviewData = {
  author: string;
  date: string;
  content: string;
  header: string;
  authorPhotoUrl: string;
  stars: string;
};

const ReviewPage = () => {
  const [value, setValue] = useState<Partial<ReviewData>[]>([]);

  const firestore = getFirestore(app);

  function convertTimestampToDateString({
    seconds,
    nanoseconds,
  }: {
    seconds: number;
    nanoseconds: number;
  }): string {
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);
    const date = new Date();
    date.setTime(milliseconds);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  async function getReviews() {
    const reviewRef = await collection(firestore, "reviews");
    const reviewList: Partial<ReviewData>[] = [];
    getDocs(reviewRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          reviewList.push({ ...doc.data() });
        });
        setValue(reviewList);
        console.log(value);
        console.log(reviewList);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <main className="Review-page">
      <h2>Reviews</h2>
      <ul>
        {value &&
          value.map((review: Partial<ReviewData>, index: number) => (
            <li className="review" key={index}>
              <div className={review.stars}>
                <StarRate />
                <StarRate />
                <StarRate />
                <StarRate />
                <StarRate />
              </div>
              <h4>{review.header}</h4>
              <p className="content">{review.content}</p>
              <div>
                <div className="review-info">
                  <div>
                    <img src={review.authorPhotoUrl} alt=""></img>
                    <p className="author">{review.author}</p>
                  </div>
                  <div className="date-container">
                    <p className="date">{review.date}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <button>Add review</button>
    </main>
  );
};

export default ReviewPage;
