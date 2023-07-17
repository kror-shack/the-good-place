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
import "./DisplayReviews.scss";
import { Link } from "react-router-dom";
import StarRate from "@mui/icons-material/StarRate";
type ReviewData = {
  author: string;
  date: string;
  content: string;
  header: string;
  authorPhotoUrl: string;
  stars: string;
};

const DisplayReviews = () => {
  const [value, setValue] = useState<Partial<ReviewData>[]>([]);

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
      })

      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getReviews();
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
        {value &&
          value.map((review: Partial<ReviewData>, index: number) => (
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
