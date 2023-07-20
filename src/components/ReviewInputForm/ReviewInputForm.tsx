import "./ReviewInputForm.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "firebase/firestore";
import { addDoc, Firestore } from "firebase/firestore";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../firebase";
import { Link, useNavigate, useRevalidator } from "react-router-dom";
import { addReview } from "../../utils/services/addReview";
import { User } from "../../types/types";
import StarRating from "../StarRating/StarRating";

const ReviewInputForm = () => {
  const user: User = useSelector((state: RootState) => state.rootReducer.user);

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

    if (user.displayName && user.uid)
      addReview(
        user.displayName,
        title,
        comment,
        rating,
        user.uid,
        user.photoURL
      );
    setRating(0);
    setTitle("");
    setComment("");
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

export default ReviewInputForm;
