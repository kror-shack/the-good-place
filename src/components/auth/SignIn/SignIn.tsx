import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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
import { useDocument } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setAdmin } from "../../../features/userSlice";
import app, { auth } from "../../../firebase";
import { AppDispatch } from "../../../store/store";
import "./SignIn.scss";

import { ReactComponent as GoogleIcon } from "../../../assets/svgs/google.svg";

interface User {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  userName?: string;
  admin?: boolean;
}

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
  const firestore = getFirestore(app);

  async function checkIfUserIsAdmin(uid: string) {
    const reservationsRef = await collection(firestore, "admin");
    const q = query(reservationsRef, where("uid", "==", uid));
    try {
      const docsJson = await getDocs(q);

      console.log("there are the json docs");
      console.log(docsJson);
      if (docsJson.docs.length > 0) {
        dispatch(setAdmin());
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signInWithEmailAndPassword(formState.email, formState.password);
  }

  const signInFromGoogle = async () => {
    console.log("trying to sign in");
    await signInWithGoogle();
    console.log("signed in");
  };

  useEffect(() => {
    if (!userFromEmail && userFromGoogle) {
      checkIfUserIsAdmin(userFromGoogle.user.uid);
      console.log("returning");
      const userData: User = {
        displayName: userFromGoogle.user.displayName,
        uid: userFromGoogle.user.uid,
        email: userFromGoogle.user.email,
        photoURL: userFromGoogle.user.photoURL,
      };
      console.log("dispatching");
      dispatch(loginUser(userData));

      navigate("/");
    } else if (userFromEmail && !userFromGoogle) {
      checkIfUserIsAdmin(userFromEmail.user.uid);

      const userData: Partial<User> = {
        displayName: userFromEmail.user.displayName,
        uid: userFromEmail.user.uid,
        email: userFromEmail.user.email,
      };

      console.log("dispatching");
      dispatch(loginUser(userData));

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
        <Link className="new-account" to="/signUp">
          Create new account
        </Link>
      </div>
    </main>
  );
};

export default SignIn;
