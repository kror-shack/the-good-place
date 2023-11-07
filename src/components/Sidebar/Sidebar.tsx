import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Stack from "@mui/material/Stack";

import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import BookIcon from "@mui/icons-material/Book";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpIcon from "@mui/icons-material/Help";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type Props = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const styles = {
  list: {
    marginTop: "6rem",
    "@media (max-width: 500px)": {
      marginTop: "3rem",
    },
  },
  listItem: {
    "&:hover": {
      color: "rgba(4, 120, 87, 0.9098039216)",

      svg: {
        color: "rgba(4, 120, 87, 0.9098039216)",
      },
    },
  },
};

const Sidebar = ({ showSidebar, setShowSidebar }: Props) => {
  const [componentHasMounted, setComponentHasMounted] = useState(false);

  useEffect(() => {
    //to prevent it on running on first load
    if (showSidebar) setComponentHasMounted(true);
  }, [showSidebar]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  function closeSidebar() {
    setShowSidebar((prev) => !prev);
  }
  return (
    <Drawer anchor="left" open={showSidebar} onClose={toggleSidebar}>
      <List sx={styles.list}>
        <ListItem
          sx={styles.listItem}
          button
          component={Link}
          to="/"
          onClick={closeSidebar}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          sx={styles.listItem}
          button
          component={Link}
          to="/menuPage"
          onClick={closeSidebar}
        >
          <ListItemIcon>
            <RestaurantMenuIcon />
          </ListItemIcon>
          <ListItemText primary="Menu" />
        </ListItem>
        <ListItem
          button
          sx={styles.listItem}
          component={Link}
          to="/orderDashboard"
          onClick={closeSidebar}
        >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Order" />
        </ListItem>

        <ListItem
          sx={styles.listItem}
          button
          component={Link}
          to="/bookTablePage"
          onClick={closeSidebar}
        >
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Reservation" />
        </ListItem>
        <ListItem
          sx={styles.listItem}
          button
          component={Link}
          to="/contactPage"
          onClick={closeSidebar}
        >
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem
          sx={styles.listItem}
          button
          component={Link}
          to="/faqPage"
          onClick={closeSidebar}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem
          sx={styles.listItem}
          button
          component={Link}
          to="/reviewPage"
          onClick={closeSidebar}
        >
          <ListItemIcon>
            <RateReviewIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
      </List>
      <Stack direction="row" spacing={2}>
        <Button href="/">
          <InstagramIcon sx={{ color: "#E4405F" }} />
        </Button>
        <Button href="/">
          <FacebookIcon sx={{ color: "#1877F2" }} />
        </Button>
        <Button href="/">
          <TwitterIcon sx={{ color: "#1DA1F2" }} />
        </Button>
      </Stack>
    </Drawer>
  );
};
export default Sidebar;
