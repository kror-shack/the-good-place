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
import { findByLabelText } from "@testing-library/react";
import { ReactComponent as GoogleIcon } from "../../assets/svgs/google.svg";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { loginUser, setAdmin } from "../../features/userSlice";
import app, { auth } from "../../firebase";
import { AppDispatch } from "../../store/store";
import "./SignInPage.scss";
import { User } from "../../types/types";
import { checkIfUserIsAdmin } from "../../utils/auth/checkIfUserIsAdmin";
import { getUserData } from "../../utils/auth/getUserData";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Snackbar,
  Stack,
} from "@mui/material";

const defaultTheme = createTheme();

const styles = {
  main: {
    marginTop: "10rem",
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
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    borderRadius: "15px",
    padding: "1rem",
  },
  googleLogin: {
    mt: 3,
    mb: 2,

    "&:hover": {},
  },
};

const SignInPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [
    signInWithEmailAndPassword,
    userFromEmail,
    loadingFromEmail,
    errorFromEmail,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, userFromGoogle, loadingFromGoogle, errorFromGoogle] =
    useSignInWithGoogle(auth);
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState<string | false>(false);
  const [resetStatus, setResetStatus] = useState<boolean | null>(null);

  const [resetEmail, setResetEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleResetEmailChange = (value: string) => {
    setResetEmail(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = formState.email;
    const password = formState.password;
    if (!email || !password) return;
    signInWithEmailAndPassword(email, password);
  };

  const signInFromGoogle = async () => {
    await signInWithGoogle();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendResetLink = () => {
    sendResetLink();
    handleClose();
  };

  async function sendResetLink() {
    if (!resetEmail) return;
    const success = await sendPasswordResetEmail(resetEmail);
    setResetStatus(success);
  }

  useEffect(() => {
    if (error) alert("There was an error while sending the email");
    if (resetStatus) alert("Please check your inbox for the reset link");
  }, [resetStatus]);

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
    <ThemeProvider theme={defaultTheme}>
      <Container
        className="SignInPage"
        sx={styles.main}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={resetEmail}
              onChange={(e) => handleResetEmailChange(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <Typography>
              You will receive an email if this email address is associated with
              an account.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSendResetLink} variant="contained">
              Send Reset Link
            </Button>
          </DialogActions>
        </Dialog>
        <Box sx={styles.box}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required={true}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={formState.email}
              autoFocus
            />

            <TextField
              margin="normal"
              required={true}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              value={formState.password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Divider>or</Divider>

            <Button
              fullWidth
              variant="contained"
              sx={styles.googleLogin}
              className="google-login"
              onClick={signInFromGoogle}
              endIcon={<GoogleIcon />}
            >
              Sign in with google
            </Button>
            <Grid container>
              <Grid item xs>
                <Stack>
                  <Button
                    onClick={handleClickOpen}
                    style={{ fontSize: "0.9rem" }}
                  >
                    Forgot password?
                  </Button>
                  <Link style={{ fontSize: "0.9rem" }} to="/SignUpPage">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Stack>
              </Grid>
              {/* <Grid item> */}
              {/* <Link style={{ fontSize: "0.9rem" }} to="/SignUpPage">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingFromGoogle || loadingFromEmail}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
