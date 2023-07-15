import React from "react";
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

const CheckoutPage: React.FC = () => {
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

  const cart = useSelector((state: RootState) => state.rootReducer.cart);
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const navigate = useNavigate();

  console.log(cart);
  const cartItems = cart.items;
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (itemId: string) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: string) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleDeleteItem = (itemId: string) => {
    dispatch(deleteItem(itemId));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  async function placeOrder() {
    const firestore = getFirestore(app);
    const reservationsRef = await collection(firestore, "orders");

    try {
      const doc = { ...cartItems, uid: user.uid };
      await addDoc(reservationsRef, doc);
      console.log("added");
      navigate("/");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item: CartItem) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </div>
          ))}
          <button onClick={handleEmptyCart}>Empty Cart</button>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
