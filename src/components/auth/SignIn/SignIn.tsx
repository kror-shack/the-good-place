import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { ReactComponentElement, useEffect, useState } from "react";
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

interface User {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  userName?: string;
  admin?: boolean;
}

const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, userP, loadingP, errorP] =
    useSignInWithEmailAndPassword(auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

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
    if (!userP && user) {
      checkIfUserIsAdmin(user.user.uid);
      console.log("returning");
      const userData: User = {
        displayName: user.user.displayName,
        uid: user.user.uid,
        email: user.user.email,
        photoURL: user.user.photoURL,
      };
      console.log("dispatching");
      dispatch(loginUser(userData));

      navigate("/");
    } else if (userP && !user) {
      checkIfUserIsAdmin(userP.user.uid);

      const userData: Partial<User> = {
        displayName: userP.user.displayName,
        uid: userP.user.uid,
        email: userP.user.email,
      };

      console.log("dispatching");
      dispatch(loginUser(userData));

      navigate("/");
    }
  }, [user, userP]);

  return (
    <main>
      <form role="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="field field_v1">
          <label htmlFor="email" className="screen-reader-label">
            Email or Username
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="field__input"
            placeholder="chidiAnagonye@gmail.com"
            value={formState.email}
            onChange={handleChange}
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Email</span>
          </span>
        </div>
        <div className="field field_v2">
          <label htmlFor="password" className="screen-reader-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="field__input"
            placeholder="password"
            value={formState.password}
            onChange={handleChange}
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Password</span>
          </span>
        </div>
        <button type="submit">login</button>
      </form>
      <Link to="/">Forgotten password?</Link>
      <Link to="/signUp">Create new account</Link>
      <button onClick={signInFromGoogle}>Login With Google</button>
    </main>
  );
};

export default SignIn;
