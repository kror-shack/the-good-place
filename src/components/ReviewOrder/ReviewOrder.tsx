import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { useEffect, useState } from "react";
import calculateTotalPrice from "../../utils/helperFunctions/calculateTotalPrice";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const styles = {
  h6: {
    fontWeight: 900,
  },
};

export default function ReviewOrder() {
  const cart = useSelector((state: RootState) => state.rootReducer.cart);
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const name = user.firstName + " " + user.lastName;
  const phoneNumber = user.phoneNumber;
  const addressParts = [];

  if (user.address) {
    if (user.address.addressLineOne) {
      addressParts.push(user.address.addressLineOne);
    }

    if (user.address.addressLineTwo) {
      addressParts.push(user.address.addressLineTwo);
    }

    if (user.address.city) {
      addressParts.push(user.address.city);
    }

    if (user.address.district) {
      addressParts.push(user.address.district);
    }
  }

  const address = addressParts.join(" ");

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cart));
  const cartItems: CartItem[] = cart.items;

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cart));
  }, [cart]);
  return (
    <React.Fragment>
      <Typography sx={styles.h6} variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">${product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 900 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>{phoneNumber}</Typography>

          <Typography gutterBottom>{address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 900 }}>
            Payment details
          </Typography>
          <Typography gutterBottom>To be collected at doorstep</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
