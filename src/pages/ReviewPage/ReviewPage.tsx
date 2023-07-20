import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase";
import { RootState } from "../../store/store";
import { useCollection } from "react-firebase-hooks/firestore";
import "./ReviewPage.scss";
import StarRate from "@mui/icons-material/StarRate";
import ReviewInputForm from "../../components/ReviewInputForm/ReviewInputForm";
import { getReviews } from "../../utils/services/getReviews";
import { ReviewData } from "../../types/types";

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Partial<ReviewData>[]>();
  const [showReviewForm, setShowReviewForm] = useState(false);

  async function updateReviews() {
    console.log("updating reveiws");
    const fetchedReviews = await getReviews();
    if (fetchedReviews) {
      setReviews(fetchedReviews);
    }
  }

  useEffect(() => {
    if (!reviews) updateReviews();
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
        {reviews &&
          reviews.map((review: Partial<ReviewData>, index: number) => (
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
