import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  emptyCart,
} from "../../features/cartSlice";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.scss";
import calculateTotalPrice from "../../utils/helperFunctions/calculateTotalPrice";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import AddressDetails from "../../components/AddressDetails/AddressDetails";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ReviewOrder from "../../components/ReviewOrder/ReviewOrder";
// import AddressForm from "./AddressForm";
// import PaymentForm from "./PaymentForm";
// import Review from "./Review";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const steps = ["Shopping Cart", "Shipping address", "Review your order"];

export default function Checkout() {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const cart = useSelector((state: RootState) => state.rootReducer.cart);
  const cartItems: CartItem[] = cart.items;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <ShoppingCart />;
      case 1:
        return <AddressDetails />;
      case 2:
        return <ReviewOrder />;
      default:
        throw new Error("Unknown step");
    }
  }

  async function handlePlaceOrder() {
    const firestore = getFirestore(app);
    const reservationsRef = await collection(firestore, "orders");

    try {
      const doc = {
        ...cartItems,
        uid: user.uid,
        address: user.address,
        phoneNumber: user.phoneNumber,
        name: `${user.firstName} ${user.lastName}`,
      };
      await addDoc(reservationsRef, doc);
      dispatch(emptyCart());
      navigate("/");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          marginTop: "9rem",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                We have emailed your order confirmation, and will send you an
                update when your order is out for delivery.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1
                      ? handlePlaceOrder
                      : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                  disabled={cartItems.length === 0 ? true : false}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

// const CheckoutPage: React.FC = () => {
//   const user = useSelector((state: RootState) => state.rootReducer.user);
//   const navigate = useNavigate();
//   const [shownComponent, setShownComponent] = useState(1);

//   function handleProceed() {
//     setShownComponent((prev) => prev + 1);
//   }

//   return (
//     <main className="Checkout-page">
//       <div className="tab-headers">
//         <h1 className={shownComponent === 1 ? "selected" : ""}>
//           1.Shopping Cart
//         </h1>
//         <h1 className={shownComponent === 2 ? "selected" : ""}>
//           2.Address Details
//         </h1>
//         <h1 className={shownComponent === 3 ? "selected" : ""}>
//           3.Review Order
//         </h1>
//       </div>
//       {shownComponent === 1 && <ShoppingCart />}
//       {shownComponent === 2 && (
//         <AddressDetails setShownComponent={setShownComponent} />
//       )}
//       {shownComponent === 3 && <div></div>}

//       {shownComponent < 3 ? (
//         <button className="proceed-button" onClick={() => handleProceed()}>
//           Proceed
//         </button>
//       ) : (
//         <button className="proceed-button">Place Order</button>
//       )}
//     </main>
//   );
// };

// export default CheckoutPage;
