import React, {
  ReactComponentElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setAdmin } from "../../features/userSlice";
import app, { auth } from "../../firebase";
import { AppDispatch } from "../../store/store";
import "./SignInPage.scss";
import { ReactComponent as GoogleIcon } from "../../assets/svgs/google.svg";
import { User } from "../../types/types";
import { checkIfUserIsAdmin } from "../../utils/auth/checkIfUserIsAdmin";
import { getUserData } from "../../utils/auth/getUserData";

const SignIn = () => {
  const [signInWithGoogle, userFromGoogle, loadingFromGoogle, errorFromGoogle] =
    useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    userFromEmail,
    loadingFromEmail,
    errorFromEmail,
  ] = useSignInWithEmailAndPassword(auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signInWithEmailAndPassword(formState.email, formState.password);
  }

  const signInFromGoogle = async () => {
    await signInWithGoogle();
  };

  async function googleSignIn() {
    if (!userFromGoogle) return;
    const isAdmin = await checkIfUserIsAdmin(userFromGoogle.user.uid);
    if (isAdmin) dispatch(setAdmin());
    const userData: Partial<User> = getUserData(userFromGoogle);
    dispatch(loginUser(userData));
  }

  async function emailSignIn() {
    if (!userFromEmail) return;
    const isAdmin = await checkIfUserIsAdmin(userFromEmail.user.uid);
    if (isAdmin) dispatch(setAdmin());
    const userData: Partial<User> = getUserData(userFromEmail);
    dispatch(loginUser(userData));
  }

  useEffect(() => {
    if (!userFromEmail && userFromGoogle) {
      googleSignIn();
      navigate("/");
    } else if (userFromEmail && !userFromGoogle) {
      emailSignIn();
      navigate("/");
    }
  }, [userFromGoogle, userFromEmail]);

  return (
    <main className="SignIn">
      <div>
        <h2>Weclome</h2>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-container">
              <div>
                <label htmlFor="email">Email or Username</label>
                <input
                  ref={emailRef}
                  type="text"
                  id="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="screen-reader-label">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit">LOGIN </button>
          </form>
          <Link className="forgot-password" to="/">
            Forgotten password?
          </Link>
          <div className="or-line-container">
            <div></div>
            <p>or</p>
            <div></div>
          </div>
        </div>
        <button className="google-login" onClick={signInFromGoogle}>
          <GoogleIcon />
          <p> Sign in with google</p>
        </button>
        <Link className="new-account" to="/signUpPage">
          Create new account
        </Link>
      </div>
    </main>
  );
};

export default SignIn;
