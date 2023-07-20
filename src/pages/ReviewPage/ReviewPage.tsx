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
import ReviewInputForm from "../../components/ReviewInputForm/ReviewInputForm";

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
  const [showReviewForm, setShowReviewForm] = useState(false);

  const firestore = getFirestore(app);

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
      <div className="header-container">
        <h2>Reviews</h2>
        <div>
          <button onClick={() => setShowReviewForm((prev) => !prev)}>
            Add review
          </button>
          {showReviewForm && <ReviewInputForm />}
        </div>
      </div>

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
    </main>
  );
};

export default ReviewPage;
