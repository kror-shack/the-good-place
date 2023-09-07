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
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";

type Props = {
  openDialog: boolean;
};

const ReviewInputForm = ({ openDialog }: Props) => {
  const user: User = useSelector((state: RootState) => state.rootReducer.user);

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleRatingChange = (newRating: number | null) => {
    if (!newRating) return;
    setRating(newRating);
  };

  const [open, setOpen] = React.useState(openDialog);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
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
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: "1rem",
        }}
      >
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            handleRatingChange(newValue);
          }}
        />
        <TextField
          label="Ttile"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <TextField
          label="Comment"
          id="comment"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          multiline
          minRows={4}
          placeholder="Enter your review..."
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "rgba(4, 120, 87, 0.9098039216)" }}
          variant="outlined"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewInputForm;
