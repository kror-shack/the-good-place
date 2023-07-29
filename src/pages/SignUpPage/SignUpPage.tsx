import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { User } from "firebase/auth";
import React, { ReactComponentElement, useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { AppDispatch } from "../../store/store";
import { SignUpForm } from "../../types/types";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "./SignUpPage.scss";

const styles = {
  main: {
    marginTop: "15rem",
    display: "flex",
    justifyContent: "center",

    "@media screen and (max-width: 500px)": {
      marginTop: "5rem",
    },
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "rgb(38 57 77) 0px 1px 35px -13px",
    padding: "1rem",
  },
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const SignUpPage = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth);
  const dispatch: AppDispatch = useDispatch();
  const [formState, setFormState] = useState<Partial<SignUpForm>>();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !formState?.email ||
      !formState.password ||
      !formState.firstName ||
      !formState.lastName
    ) {
      return;
    }
    await createUserWithEmailAndPassword(formState.email, formState.password);
  }

  async function updateUserProfile() {
    if (!formState?.firstName || !formState?.lastName) return;
    const displayName = `${formState.firstName} ${formState.lastName}`;
    await updateProfile({ displayName });
  }
  useEffect(() => {
    if (!user) return;
    if (!formState) return;
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
    <ThemeProvider theme={defaultTheme}>
      <Container sx={styles.main} component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={styles.box}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formState?.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formState?.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formState?.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formState?.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/SignInPage">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
