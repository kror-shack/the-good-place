import "./ReviewInputForm.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "firebase/firestore";
import { addDoc, Firestore } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

interface ReviewInputFormProps {
  // Props, if any, can be added here
}

const ReviewInputForm: React.FC<ReviewInputFormProps> = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // You can perform any actions with the rating and comment data here
    addReview();

    // Reset the form after submitting
    setRating(0);
    setComment("");
  };

  function getCurrentDate(): string {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const year = String(currentDate.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  }

  function numberToWord(number: number): string {
    const numberWords = ["zero", "one", "two", "three", "four", "five"];

    if (number >= 0 && number <= 5) {
      return numberWords[number];
    } else {
      throw new Error("Invalid number. The number should be between 0 and 5.");
    }
  }

  const firestore = getFirestore(app);
  const addReview = async () => {
    console.log("adding review");
    const reservationsRef = await collection(firestore, "reviews");
    const doc = {
      author: user.displayName,
      authorPhotoUrl: user.photoURL,
      date: getCurrentDate(),
      uid: user.photoURL,
      header: title,
      content: comment,
      stars: numberToWord(rating),
    };
    try {
      await addDoc(reservationsRef, doc);
      console.log("added");
      window.location.reload();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="Review-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating: </label>
        <StarRating value={rating} onChange={handleRatingChange} />
      </div>
      <div>
        <label htmlFor="Header">Title: </label>
        <textarea
          id="title"
          value={title}
          onChange={handleTitleChange}
          rows={4}
          cols={40}
          placeholder="Title"
        />
      </div>
      <div>
        <label htmlFor="comment">Comment: </label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          rows={4}
          cols={40}
          placeholder="Enter your review..."
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

interface StarRatingProps {
  value: number;
  onChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  return (
    <div id="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{ cursor: "pointer", color: star <= value ? "gold" : "gray" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default ReviewInputForm;
