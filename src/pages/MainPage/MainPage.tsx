import { Link } from "react-router-dom";
import "./MainPage.scss";
import { ReactComponent as PlateSvg } from "../../assets/svgs/plate.svg";
import { ReactComponent as ChefSvg } from "../../assets/svgs/chef.svg";
import { ReactComponent as DateSvg } from "../../assets/svgs/date.svg";
import { ReactComponent as DeliverySvg } from "../../assets/svgs/delivery.svg";
import { ReactComponent as PartySvg } from "../../assets/svgs/party.svg";
import { ReactComponent as PetsSvg } from "../../assets/svgs/pets.svg";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
  Skeleton,
  Stack,
} from "@mui/material";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import React, { useEffect, useState } from "react";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import DisplayReviews from "../../components/DisplayReviews/DisplayReviews";

const styles = {
  header: {
    fontFamily: "Josefin-sans-bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    justifyContent: "flex-start",
    color: "#047857e8",
    fontWeight: 900,
    letterSpacing: "2px",
    marginRight: "16px",
    marginBottom: "2rem",

    "@media (max-width: 700px)": {
      fontSize: "1.3rem",
    },

    "@media (min-width: 701px)": {
      fontSize: "1.2rem",
    },

    "@media (max-width: 500px)": {
      fontSize: "0.9rem",
      marginBottom: "2rem",
    },
  },
};

type Props = {
  firstRender: boolean;
  setFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
};
const MainPage = ({ firstRender, setFirstRender }: Props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(firstRender);

  const handleEmailChange = (e: string) => {
    setEmail(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!firstRender) return;
    let timer = setTimeout(() => setIsLoading(false), 2500);
    setFirstRender(false);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <Box className="Main-page">
          <Skeleton animation="wave" height="5rem" width="15rem" />
          <Grid container spacing={2} sx={{ height: "80vh" }}>
            <Grid xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            </Grid>
          </Grid>
          <Skeleton
            variant="rectangular"
            width="80%"
            height="50vh"
            animation="wave"
            sx={{ margin: "4rem auto" }}
          />
          <Grid container spacing={2} sx={{ height: "80vh" }}>
            <Grid xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <Box sx={{ display: isLoading ? "none" : "block" }} className="Main-page">
        <Link to="/bookTablePage" className="book-table-link">
          BOOK YOUR TABLE
        </Link>
        <Grid
          container
          sx={{ justifyContent: "center", marginTop: "auto" }}
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12} sm={6} className="first-grid-item">
            <Typography variant="h6">
              TASTE AN UNFORGETTABLE EXPERIENCE
            </Typography>
            <Typography variant="h2" component="h2">
              Where <span>Taste</span> Meets <span>Experience</span>
            </Typography>
            <Typography variant="subtitle2" className="sub-header">
              Culinary artistry redefined, a symphony of taste and refinement,
              embark on a culinary adventure like no other.
            </Typography>
            <Link to="/MenuPage">Menu</Link>
          </Grid>
          <Grid xs={12} sm={6} className="image-container">
            <img
              src={require(`../../assets/images/shayda-torabi-3iexvMShGfQ-unsplash 1(1).png`)}
              alt=""
            ></img>
          </Grid>
          <Grid xs={4} sx={{ gridColumn: "4" }} className="second-block">
            <div className="second-block-content-container">
              <Typography variant="body1">
                Indulge in a feast for the senses at our exquisite restaurant.
                Immerse yourself in a culinary wonderland, where each dish is a
                masterpiece crafted with passion and precision.
              </Typography>
              <Typography variant="body1">
                From delectable flavors to impeccable service, our establishment
                promises an unforgettable dining experience that will leave you
                craving for more.
              </Typography>
            </div>
          </Grid>
          <Grid xs={12}>
            <Grid container className="third-block-container">
              <Grid xs={12} className="third-block">
                <div>
                  <p>DISCOVER YOUR TASTE!</p>
                  <div>
                    <p>
                      Welcome to <span>The Good Place</span> Where Impeccable
                      Quality Meets Unforgettable Taste.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <PlateSvg />
                    <p>
                      "Savor the Purity of Freshness, Where Clean and Vibrant
                      Ingredients Shine."
                    </p>
                  </div>
                  <div>
                    <ChefSvg />
                    <p className="chef-text">
                      "Uncompromising quality, where every bite is a delectable
                      masterpiece."
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={8}>
                <img
                  src={require(`../../assets/images/ronan-kruithof-x5NGqt2hdrE-unsplash 1(1).png`)}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <div className="news-letter-container">
              <div>
                <Typography variant="h3">
                  Sign Up For THE GOOD PLACE Newsletter
                </Typography>
                <Typography variant="body1">
                  Keep up to date with our news and event updates
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    label="Email"
                    required
                  />
                  <Button type="submit" variant="contained">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </Grid>

          <Grid xs={12} sm={8} mt={4}>
            <Box sx={{ paddingLeft: "16px" }}>
              <Typography
                component="h2"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                sx={styles.header}
              >
                SERVICES
              </Typography>
            </Box>
            <Grid
              container
              spacing={4}
              className="services-container"
              columns={12}
              mx={4}
              sx={{ justifyContent: "space-evenly" }}
            >
              <Grid xs={6} lg={3}>
                <div>
                  <EventAvailableOutlinedIcon />
                  <p>Reservations</p>
                  <p className="service-description">Are Recommended</p>
                </div>
              </Grid>
              <Grid xs={6} lg={3}>
                <div className="align-right">
                  <DeliveryDiningOutlinedIcon />
                  <p>Delivery</p>
                  <p className="service-description">Free Delivery</p>
                </div>
              </Grid>
              <Grid xs={6} lg={3}>
                <div>
                  <PartySvg />
                  <p>Theme</p>
                  <p className="service-description">Special Occasions</p>
                </div>
              </Grid>
              <Grid xs={6} lg={3}>
                <div className="align-right">
                  <PetsSvg />
                  <p>Pets Allowed</p>
                  <p className="service-description">For Furry Companions</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <DisplayReviews />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default MainPage;
