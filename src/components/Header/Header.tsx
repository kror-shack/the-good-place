import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MainLogo } from "../../assets/svgs/header-logo.svg";
import { ReactComponent as CartLogo } from "../../assets/svgs/cart.svg";
import { ReactComponent as MenuSvg } from "../../assets/svgs/menu.svg";
import "./Header.scss";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";
import app, { auth } from "../../firebase";
import { ProviderId } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { loginUser, logoutUser } from "../../features/userSlice";
import AvatarMenu from "../AvatarMenu/AvatarMenu";

interface User {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  userName?: string;
}

type Props = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({ setShowSidebar }: Props) => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  console.log(user);
  const dispatch: AppDispatch = useDispatch();

  return (
    <header>
      <HamburgerMenu setShowSidebar={setShowSidebar} />

      <MainLogo />
      <div className="header-left">
        <Link to="/bookTable" className="book-table-link">
          BOOK YOUR TABLE
        </Link>
        {user && user.email ? (
          <AvatarMenu />
        ) : (
          <Link to="/signIn" className="login-button">
            Login
          </Link>
        )}
        {/* {user && <div>user is logged in</div>} */}
      </div>
    </header>
  );
};

export default Header;
