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
    <main className="SignUp">
      <div>
        <h2>Create Your Account</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-container">
            <label htmlFor="firstName" className="screen-reader-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input"
              placeholder="Name"
              value={formState.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName" className="screen-reader-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input"
              placeholder="Last Name"
              value={formState.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email" className="screen-reader-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="screen-reader-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="login">
          <p>Already have an account?</p> <Link to="/signIn"> Login</Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
