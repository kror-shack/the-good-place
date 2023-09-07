import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SignInPage from "../../pages/SignInPage/SignInPage";
import { RootState } from "../../store/store";
import { User } from "../../types/types";

type Props = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: Props) => {
  const user: User = useSelector((state: RootState) => state.rootReducer.user);
  if (!user.isAuthenticated) {
    return <Navigate to="/SignInPage" replace={true} />;
  } else return children;
};

export default ProtectedRoute;
