import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "./OrderDashboard.scss";
import uniqid from "uniqid";
import { addToCart } from "../../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import calculateTotalCartItems from "../../utils/helperFunctions/calculateTotalCartItems";
import {
  Tabs,
  Tab,
  Button,
  Box,
  Container,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Alert,
  AlertTitle,
  Snackbar,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { SnackbarCloseReason } from "@mui/material";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  photoUrl?: string;
}

const categories = [
  "Pastas",
  "Entrees",
  "Soups",
  "Salads",
  "Appetizers",
  "Steaks",
  "Wines",
  "Coffee",
  "Gin",
  "Tonic",
];

type Cart = {
  [heading: string]: CartItem[];
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
  palette: {
    secondary: {
      main: "#0d9488", // Green color
    },
  },
});

const styles = {
  buttonStyles: {
    color: "#0d9488",
    borderColor: "#0d9488",
    marginTop: "0.5rem",
    marginBottom: "0rem",
  },
};

const OrderDashboard = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const [items, setItems] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const Appetizers: CartItem[] = [
    {
      name: "Crispy Delight",
      price: 5.5,
      description: "Deep-fried calamari rings served with tangy sauce.",
      quantity: 1,
      photoUrl:
        "https://images.unsplash.com/photo-1549203386-9d4394c8a2fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2008&q=80",
    },
    {
      name: "Calamari Delight",
      price: 5.5,
      description: "Deep-fried calamari rings served with tangy sauce.",
      quantity: 1,
      photoUrl:
        "https://images.unsplash.com/photo-1549203386-9d4394c8a2fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2008&q=80",
    },
    {
      name: "Crispy Calamari",
      price: 5.5,
      description: "Deep-fried calamari rings served with tangy sauce.",
      quantity: 1,
      photoUrl:
        "https://images.unsplash.com/photo-1549203386-9d4394c8a2fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2008&q=80",
    },
  ];
  const Pastas: CartItem[] = [
    {
      name: "Spaghetti Bgolognese",
      price: 10.99,
      description: "Spaghetti served with rich tomato meat sauce and onions.",
      quantity: 1,
    },
    {
      name: "Spaghetti Boglognese",
      price: 10.99,
      description: "Spaghetti served with rich tomato meat sauce and onions.",
      quantity: 1,
    },
    {
      name: "Spaghetti Bodlognese",
      price: 10.99,
      description: "Spaghetti served with rich tomato meat sauce and onions.",
      quantity: 1,
    },
  ];
  const renderTabContent = () => {
    if (activeTab === "Appetizers") {
      setShownMenu(Appetizers);
    } else if (activeTab === "Pastas") {
      setShownMenu(Pastas);
    }
  };

  const cart: RootState = useSelector(
    (state: RootState) => state.rootReducer.cart
  );
  const dispatch: AppDispatch = useDispatch();
  const [shownMenu, setShownMenu] = useState(Appetizers);
  const [activeTab, setActiveTab] = useState<string>("Appetizers");
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  function addProductToCart(product: CartItem) {
    if (!user.isAuthenticated) {
      setShowAlert(true);
      return;
    }

    dispatch(addToCart(product));
    setOpenSnackBar(true);
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handlePopUpClose = () => {
    setShowAlert(false);
  };

  function handleTabChange() {}

  useEffect(() => {
    renderTabContent();
  }, [activeTab]);

  useEffect(() => {
    const totalItems = calculateTotalCartItems(cart);
    setItems(totalItems);
  }, [addProductToCart]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="Order-dashboard"
        component="main"
        maxWidth="lg"
        sx={{ padding: "0rem 0.5rem" }}
      >
        <Stack spacing={0} sx={{ justifyContent: "center" }}>
          {/* cart container start */}
          {items > 0 && (
            <div className="cart-container">
              <IconButton
                onClick={() => {
                  navigate("/checkoutpage");
                }}
                color="inherit"
              >
                <Badge badgeContent={items} color="primary">
                  <ShoppingCartIcon sx={{ color: "black" }} />
                </Badge>
              </IconButton>
            </div>
          )}
          <Typography variant="h4">Order</Typography>

          {/* cart container end */}
        </Stack>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Menu categories"
          textColor="secondary"
          indicatorColor="secondary"
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
        <Divider sx={{ marginBottom: "1rem" }} />
        <Box>
          <Grid container spacing={2} className="item-container">
            {shownMenu.map((item) => (
              <Grid xs={12} key={item.name}>
                <Card>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    {item.photoUrl && (
                      <CardMedia
                        component="img"
                        image={item.photoUrl}
                        alt={item.name}
                        sx={{
                          height: "6rem",
                          width: "6rem",
                          borderRadius: "5rem",
                        }}
                      />
                    )}
                    <CardContent>
                      <div className="item-title">
                        <Typography variant="h5" component="h3">
                          {item.name}
                        </Typography>
                        <Typography variant="body1" className="price">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </div>
                      <hr className="title-line" />
                      {item.description && (
                        <Typography variant="body2" className="description">
                          {item.description}
                        </Typography>
                      )}
                      <div className="button-container">
                        <Button
                          sx={styles.buttonStyles}
                          variant="outlined"
                          onClick={() => addProductToCart(item)}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </CardContent>
                  </Stack>
                  <Snackbar
                    open={openSnackBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      {item.name} added to cart!
                    </Alert>
                  </Snackbar>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Dialog
          open={showAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handlePopUpClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Login Required"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please Login to continue ordering.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopUpClose}>Close</Button>
            <Link
              style={{
                textDecoration: "none",
                lineHeight: "1.75rem",
                color: "red",
                fontFamily: "Roboto",
              }}
              to="/SignInPage"
              className="sign-in-link"
            >
              LOGIN
            </Link>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default OrderDashboard;
