import { User } from "firebase/auth";
import React, { ReactComponentElement, useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../features/userSlice";
import { auth } from "../../../firebase";
import { AppDispatch } from "../../../store/store";
import "./SignUp.scss";

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("before signing up");
    console.log(formState.email);
    console.log(formState.password);
    await createUserWithEmailAndPassword(formState.email, formState.password);
    console.log("after signing up");
  }

  async function updateUserProfile() {
    const displayName = `${formState.firstName} ${formState.lastName}`;
    await updateProfile({ displayName });
  }
  useEffect(() => {
    if (!user) return;
    const userData: Partial<User> = {
      displayName: `${formState.firstName} ${formState.lastName}`,
      uid: user.user.uid,
      email: user.user.email,
    };
    dispatch(loginUser(userData));
    updateUserProfile();
    navigate("/");
  }, [user]);

  return (
    <main>
      <form role="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="field field_v2">
          <label htmlFor="firstName" className="screen-reader-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="field__input"
            placeholder="Chidi"
            value={formState.firstName}
            onChange={handleChange}
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">First Name</span>
          </span>
        </div>
        <div className="field field_v2">
          <label htmlFor="lastName" className="screen-reader-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="field__input"
            placeholder="Anagonye"
            value={formState.lastName}
            onChange={handleChange}
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Last Name</span>
          </span>
        </div>
        <div className="field field_v1">
          <label htmlFor="email" className="screen-reader-label">
            Email
          </label>
          <input
            type="email"
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

        <button type="submit">Sign Up</button>
      </form>
      <Link to="/">Already have an account? Login</Link>
    </main>
  );
};

export default SignUp;
