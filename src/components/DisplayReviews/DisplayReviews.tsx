import React, { useContext, useEffect, useState } from "react";
import "./DisplayReviews.scss";
import { Link } from "react-router-dom";
import StarRate from "@mui/icons-material/StarRate";
import { getReviews } from "../../utils/services/getReviews";
type ReviewData = {
  author: string;
  date: string;
  content: string;
  header: string;
  authorPhotoUrl: string;
  stars: string;
};

const DisplayReviews = () => {
  const [reviews, setReviews] = useState<Partial<ReviewData>[]>();

  async function fetchReviews() {
    const reviewList = await getReviews();
    setReviews(reviewList.slice(0, 3));
  }

  useEffect(() => {
    if (!reviews) fetchReviews();
  }, []);

  return (
    <section className="Display-reviews">
      <div>
        <h3>TESTEMONIALS</h3>

        <h5>What Our Visitors Say</h5>
        <p className="sub-header">
          "Honest Testimonials: Unfiltered Experiences Shared by Our Esteemed
          Guests."
        </p>
      </div>
      <div className="review-container">
        {reviews &&
          reviews.map((review: Partial<ReviewData>, index: number) => (
            <div className="review" key={index}>
              <div className={review.stars}>
                <StarRate />
                <StarRate />
                <StarRate />
                <StarRate />
                <StarRate />
              </div>
              <h4>{review.header}</h4>
              <p className="content">{review.content}</p>
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
          ))}
      </div>
      <div className="link-container">
        <Link to="/reviewPage">More Reviews</Link>
      </div>
    </section>
  );
};

export default DisplayReviews;
