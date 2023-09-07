import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
} from "../../features/cartSlice";
import { RootState } from "../../store/store";
import calculateTotalPrice from "../../utils/helperFunctions/calculateTotalPrice";
import "./ShoppingCart.scss";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const styles = {
  buttonStyles: {
    minWidth: "25px",
    padding: "4px",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "50%",
    cursor: "pointer",
    color: "black",
    maxHeight: "25px",
  },
};

const ShoppingCart = () => {
  const cart = useSelector((state: RootState) => state.rootReducer.cart);
  const cartItems: CartItem[] = cart.items;
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cart));
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (itemName: string) => {
    dispatch(increaseQuantity(itemName));
  };

  const handleDecreaseQuantity = (itemName: string) => {
    dispatch(decreaseQuantity(itemName));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  function calculateProductPrice(price: number, quantity: number): number {
    return price * quantity;
  }

  useEffect(() => {}, []);
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cart));
  }, [cart]);

  return (
    <List disablePadding>
      {cartItems.map((product) => (
        <ListItem
          key={product.name}
          sx={{ py: 1, px: 0, display: "flex", flexDirection: "column" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <ListItemText primary={product.name} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 400, fontSize: "1rem" }}
            >
              ${calculateProductPrice(product.price, product.quantity)}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              onClick={() => handleDecreaseQuantity(product.name)}
              sx={styles.buttonStyles}
            >
              -
            </Button>
            <Typography variant="body1" component="p" sx={{ mx: 2 }}>
              {product.quantity}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleIncreaseQuantity(product.name)}
              sx={styles.buttonStyles}
            >
              +
            </Button>
          </Box>
        </ListItem>
      ))}
      <Divider />
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontSize: "1.2rem" }}
        >
          {totalPrice}
        </Typography>
      </ListItem>
      <Button
        variant="outlined"
        onClick={() => handleEmptyCart()}
        disabled={cartItems.length === 0 ? true : false}
        sx={{
          color: "rgba(4, 120, 87, 0.9098039216)",
          borderColor: "rgba(4, 120, 87, 0.9098039216)",
        }}
      >
        Empty Cart
      </Button>
    </List>
  );
};

export default ShoppingCart;
