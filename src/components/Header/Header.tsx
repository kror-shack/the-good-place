import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as MainLogo } from "../../assets/svgs/header-logo.svg";
import { ReactComponent as CartLogo } from "../../assets/svgs/cart.svg";
import "./Header.scss";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import Sidebar from "../Sidebar/Sidebar";
import LoginIcon from "@mui/icons-material/Login";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../../types/types";

type Props = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const styles = {
  appBar: {
    position: "fixed",
    top: 0,
    left: 0,
    maxHeight: "min-content",
    fontFamily: "Josefin-sans",
    boxSizing: "border-box",
    border: "1px solid white",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    color: "black",
    backgroundColor: "white",
  },
  menuIcon: {
    display: "flex",
    justifyContent: "flex-start",
    position: "relative",

    "@media (min-width: 700px)": {
      "&>svg": {
        height: "2.5rem",
        width: "2rem",
      },
    },

    "@media (max-width: 500px)": {
      "&>svg": {
        height: "2rem",
        width: "1.5rem",
      },
    },
  },
  toolbar: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "0.2fr 1.8fr 0.2fr",
    position: "relative",
    zIndex: "10",

    "@media (max-width: 500px)": {
      gridTemplateColumns: "0.1fr 1.8fr 0.1fr",
    },
  },
  loginButton: {
    background: "white",
    color: "black",
    fontSize: "1rem",
    transition: "all 0.2s",

    "&:hover": {
      color: "white",
      backgroundColor: "rgba(4, 120, 87, 0.9098039216)",
      border: "none",
    },

    "@media (max-width: 500px)": {
      fontSize: "0.9rem",
    },
  },

  header: {
    fontFamily: "Josefin-sans",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "1.6rem",

    "@media (max-width: 700px)": {
      fontSize: "1.3rem",
    },

    "@media (max-width: 500px)": {
      fontSize: "1.3rem",
    },
  },
};

const Header = ({ showSidebar, setShowSidebar }: Props) => {
  const navigate = useNavigate();
  function openSidebar() {
    setShowSidebar((prev) => !prev);
  }
  const user: User = useSelector((state: RootState) => state.rootReducer.user);
  return (
    <AppBar className="header" sx={styles.appBar} position="fixed">
      <Toolbar sx={styles.toolbar} className="tool-bar">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={styles.menuIcon}
          onClick={openSidebar}
        >
          {showSidebar ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Typography variant="h3" sx={styles.header}>
          The Good Place
          <MainLogo className="main-icon" />
        </Typography>{" "}
        {user.isAuthenticated ? (
          <AvatarMenu />
        ) : (
          <Button
            variant="contained"
            endIcon={<LoginIcon />}
            sx={styles.loginButton}
            onClick={() => {
              navigate("/SignInPage");
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
