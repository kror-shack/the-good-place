import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase";
import { RootState } from "../../store/store";
import { useCollection } from "react-firebase-hooks/firestore";
import "./ReviewPage.scss";
import ReviewInputForm from "../../components/ReviewInputForm/ReviewInputForm";
import { getReviews } from "../../utils/services/getReviews";
import { ReviewData } from "../../types/types";
import { Link } from "react-router-dom";
import StarRate from "@mui/icons-material/StarRate";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Avatar,
  Backdrop,
  CircularProgress,
  Rating,
  Snackbar,
} from "@mui/material";
import "./ReviewPage.scss";

const styles = {
  main: {
    marginTop: "15rem",

    "@media screen and (max-width: 500px)": {
      marginTop: "2rem",
    },
  },
  header: {
    fontFamily: "Josefin-sans",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    justifyContent: "center",

    "@media (max-width: 700px)": {
      fontSize: "1.3rem", // Example: reduce font size on screens up to 600px wide
    },

    "@media (max-width: 500px)": {
      fontSize: "1.4rem", // Example: reduce font size on screens up to 600px wide
    },
  },
  h5: {
    "@media (max-width: 700px)": {
      fontSize: "1.1rem", // Example: reduce font size on screens up to 600px wide
    },

    "@media (max-width: 500px)": {
      fontSize: "1.1rem", // Example: reduce font size on screens up to 600px wide
    },
  },
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ReviewPage() {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState<Partial<ReviewData>[]>();
  const [showReviewForm, setShowReviewForm] = useState(false);

  function handleShowReview() {
    if (!user.email) setError(true);
    else setShowReviewForm((prev) => !prev);
  }

  async function fetchReviews() {
    const reviewList = await getReviews();
    setReviews(reviewList.slice(0, 3));
  }

  useEffect(() => {
    if (!reviews) fetchReviews();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main className="Review-page">
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={error}
            autoHideDuration={6000}
            onClose={() => setError(false)}
            message="Please login to leave a review"
          >
            <Alert severity="error">Please Login to leave a review!</Alert>
          </Snackbar>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={styles.header}
            >
              TESTIMONIALS
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={styles.h5}
            >
              What Our Visitors Say
            </Typography>
            <Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: "rgba(4, 120, 87, 0.9098039216)" }}
                onClick={() => handleShowReview()}
              >
                Add review
              </Button>
              {showReviewForm && (
                <ReviewInputForm openDialog={showReviewForm} />
              )}{" "}
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {reviews ? (
              reviews.map((review, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Rating
                      name={`rating-${index}`}
                      value={review.stars}
                      precision={0.5}
                      readOnly
                      sx={{ paddingLeft: "1rem" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {review.header}
                      </Typography>
                      <Typography>{review.content}</Typography>
                    </CardContent>
                    <Grid
                      sx={{ padding: "0.5rem 1rem" }}
                      container
                      className="review-info"
                      spacing={2}
                    >
                      <Grid item>
                        <Avatar src={review.authorPhotoUrl} alt="" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" className="author">
                          {review.author}
                        </Typography>
                      </Grid>
                      <Grid item className="date-container">
                        <Typography variant="body1" className="date">
                          {review.date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))
            ) : (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

// const ReviewPage = () => {
//   const [reviews, setReviews] = useState<Partial<ReviewData>[]>();
//   const [showReviewForm, setShowReviewForm] = useState(false);

//   async function updateReviews() {
//     console.log("updating reveiws");
//     const fetchedReviews = await getReviews();
//     if (fetchedReviews) {
//       setReviews(fetchedReviews);
//     }
//   }

//   useEffect(() => {
//     if (!reviews) updateReviews();
//   }, []);

//   return (
//     <main className="Review-page">
//       <div className="header-container">
//         <h2>Reviews</h2>
//         <div>
//           <button onClick={() => setShowReviewForm((prev) => !prev)}>
//             Add review
//           </button>
//           {showReviewForm && <ReviewInputForm />}
//         </div>
//       </div>

//       <ul>
//         {reviews &&
//           reviews.map((review: Partial<ReviewData>, index: number) => (
//             <li className="review" key={index}>
//               <Rating
//                 name="half-rating"
//                 defaultValue={review.stars}
//                 precision={0.5}
//               />
//               <h4>{review.header}</h4>
//               <p className="content">{review.content}</p>
//               <div>
//                 <div className="review-info">
//                   <div>
//                     <img src={review.authorPhotoUrl} alt=""></img>
//                     <p className="author">{review.author}</p>
//                   </div>
//                   <div className="date-container">
//                     <p className="date">{review.date}</p>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//       </ul>
//     </main>
//   );
// };

// export default ReviewPage;
