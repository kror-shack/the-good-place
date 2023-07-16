import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MainLogo } from "../../assets/svgs/header-logo.svg";
import { ReactComponent as CartLogo } from "../../assets/svgs/cart.svg";
import "./Header.scss";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import Sidebar from "../Sidebar/Sidebar";

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
const Header = ({ showSidebar, setShowSidebar }: Props) => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  console.log(user);

  return (
    <header>
      <HamburgerMenu setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} />

      <MainLogo />
      <div className="header-right">
        {/* <div className="header-left"> */}
        {user && user.email ? (
          <AvatarMenu />
        ) : (
          <Link to="/signIn" className="login-button">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
