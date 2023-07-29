import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import React from "react";
import { useEffect, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { AppDispatch, RootState } from "../../store/store";
import "./AvatarMenu.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { User } from "../../types/types";
import fetchRandomImage from "../../utils/services/fetchRandomImage";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import getInitials from "../../utils/helperFunctions/getInitials";

export interface loggedUser
  extends Omit<User, "uid" | "email" | "displayName" | "userName"> {
  uid: string;
  email: string;
  displayName: string;
}

const AvatarMenu = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(isDesktop);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user: loggedUser = useSelector(
    (state: RootState) => state.rootReducer.user
  );
  const dispatch: AppDispatch = useDispatch();
  const [userPhotoUrl, setUserPhotoUrl] = useState<string>(
    "https://unsplash.com/photos/kTqx1Y48WOs"
  );
  const initials = getInitials(user.displayName);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [signOut, loading, error] = useSignOut(auth);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function setRandomImage() {
    const randomImg = await fetchRandomImage();
    if (!randomImg) return;
    setUserPhotoUrl(randomImg);
  }

  async function handleSignOutUser() {
    console.log("handling the sign out of the user");
    await signOut();
    dispatch(logoutUser());
    navigate("/");
  }

  useEffect(() => {
    if (!user) return;
    if (user.photoURL) setUserPhotoUrl(user.photoURL);
    else {
      console.log("setting a random user photoURL");
      setRandomImage();
    }
  }, [user]);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size={isDesktop ? "large" : "small"}
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img src={userPhotoUrl} alt="" />
            </Avatar>
            {user.isAdmin ? (
              <p>Admin</p>
            ) : (
              <p className="initials">{initials}</p>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        className="Avatar-menu"
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: -1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar />{" "}
          <Link to="/profilePage" className="avatar-link">
            {user.isAdmin ? "Admin" : user.displayName}
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem href="/YourReservationsPage">
          <ListItemIcon>
            <EventNoteIcon fontSize="small" />
          </ListItemIcon>
          <Link to="/YourReservationsPage" className="avatar-link">
            {user.isAdmin ? "Reservations" : "Your Reservations"}
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeliveryDiningIcon fontSize="small" />
          </ListItemIcon>
          <Link to="#" className="avatar-link">
            {" "}
            {user.isAdmin ? "Orders" : "Previous Orders"}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleSignOutUser}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AvatarMenu;
