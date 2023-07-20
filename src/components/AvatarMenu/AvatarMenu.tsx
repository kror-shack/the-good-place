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
import getInitials from "../../utils/helperFunctions/getInitials";

export interface loggedUser
  extends Omit<User, "uid" | "email" | "displayName" | "userName"> {
  uid: string;
  email: string;
  displayName: string;
}

const AvatarMenu = () => {
  const user: loggedUser = useSelector(
    (state: RootState) => state.rootReducer.user
  );
  const dispatch: AppDispatch = useDispatch();
  const [userPhotoUrl, setUserPhotoUrl] = useState<string>(
    "https://unsplash.com/photos/kTqx1Y48WOs"
  );
  const initials = getInitials(user.displayName);
  const navigate = useNavigate();

  const [signOut, loading, error] = useSignOut(auth);

  async function setRandomImage() {
    const randomImg = await fetchRandomImage();
    if (!randomImg) return;
    setUserPhotoUrl(randomImg);
  }

  async function signOutUser() {
    await signOut();
    dispatch(logoutUser());
    navigate("/");
  }

  useEffect(() => {
    if (!user) return;
    if (user.photoURL) setUserPhotoUrl(user.photoURL);
    else {
      setRandomImage();
    }
  }, [user]);

  return (
    <div className="Avatar-menu">
      <div className="profile-details">
        <img src={userPhotoUrl} alt="" />
        {user.isAdmin ? <p>Admin</p> : <p className="initials">{initials}</p>}
        <ArrowDropDownIcon />
      </div>
      <div className="dropdown-menu">
        <p className="display-name">
          {user.isAdmin ? "Admin" : user.displayName}
        </p>
        <div>
          <EventNoteIcon />
          <Link to="/YourReservationsPage">
            {user.isAdmin ? "Reservations" : "Your Reservations"}
          </Link>
        </div>
        <div>
          <DeliveryDiningIcon />
          <Link to="/"> Previous Orders</Link>
        </div>
        <div className="sign-out-container">
          <button onClick={signOutUser}>Log Out</button>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default AvatarMenu;
