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

interface User {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  userName?: string;
}

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
        height: "3.5rem",
        width: "3rem",
      }, // Example: reduce font size on screens up to 600px wide
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
      backgroundColor: "#8fa2a0",
      border: "none",
    },

    "@media (max-width: 500px)": {
      fontSize: "0.9rem",
    },
  },

  ///2TEyIyXiS69dKd0BL6No8vqC4iZ_7d5D28hzn71tvtNUgx16q
  header: {
    fontFamily: "Josefin-sans",
    display: "flex",
    alignItems: "center",
    gap: "5px",

    "@media (max-width: 700px)": {
      fontSize: "1.3rem", // Example: reduce font size on screens up to 600px wide
    },

    "@media (max-width: 500px)": {
      fontSize: "1.3rem", // Example: reduce font size on screens up to 600px wide
    },
  },
};

const Header = ({ showSidebar, setShowSidebar }: Props) => {
  const navigate = useNavigate();
  function openSidebar() {
    console.log("opening the side bar");
    setShowSidebar((prev) => !prev);
  }
  const user = useSelector((state: RootState) => state.rootReducer.user);
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
        {user && user.email ? (
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

//   return (
//     <header>
//       <HamburgerMenu
//         showSidebar={showSidebar}
//         setShowSidebar={setShowSidebar}
//       />
//       <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

//       <MainLogo />
//       <div className="header-right">
//         {user && user.email ? (
//           <AvatarMenu />
//         ) : (
//           <Link to="/SignInPage" className="login-button">
//             Login
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
