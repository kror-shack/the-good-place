import React, { useContext, useEffect, useState } from "react";
import "./DisplayReviews.scss";
import { Link } from "react-router-dom";
import StarRate from "@mui/icons-material/StarRate";
import { getReviews } from "../../utils/services/getReviews";
import { ReviewData } from "../../types/types";
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
import { Avatar, Rating } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const styles = {
  header: {
    fontFamily: "Josefin-sans-bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    justifyContent: "center",
    color: "#047857e8",
    fontWeight: 900,
    letterSpacing: "2px",

    "@media (max-width: 700px)": {
      fontSize: "1.3rem",
      justifyContent: "flex-start",
    },

    "@media (max-width: 500px)": {
      fontSize: "0.9rem",
      marginBottom: "1rem",
    },
  },
  h5: {
    "@media (max-width: 700px)": {
      fontSize: "1.1rem",
    },

    "@media (max-width: 500px)": {
      display: "none",
    },
  },
  secondaryH5: {
    "@media (max-width: 700px)": {
      fontSize: "1.1rem",
    },

    "@media (max-width: 500px)": {
      fontSize: "1.3rem",
    },
  },
  box: {
    bgcolor: "background.paper",
    pt: 8,
    pb: 6,

    "@media (max-width: 500px)": {
      padding: 0,
    },
  },
};

export default function DisplayReviews() {
  const [reviews, setReviews] = useState<Partial<ReviewData>[]>();

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

      <main>
        <Box sx={styles.box}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              sx={styles.header}
            >
              TESTIMONIALS
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
              sx={styles.h5}
            >
              What Our Visitors Say
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text"
              paragraph
              sx={styles.secondaryH5}
            >
              Unfiltered Experiences Shared by Our Esteemed Guests.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ pt: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {reviews &&
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
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
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
              ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper" }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          <Link className="link" to="/reviewPage">
            More Reviews
          </Link>
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
