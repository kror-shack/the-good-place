import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "./OrderDashboard.scss";
import uniqid from "uniqid";
import { addToCart } from "../../features/cartSlice";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderDashboard = () => {
  const Products: CartItem[] = [
    {
      name: "At the Existentialist Cafe",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "Beyond Good and Evil",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "Competitive Advantage",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "Finite and Infinite Games",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "History of Western Philosophy",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "How the World Thinks",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "Lessons in Stoicism",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "Meditations",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },

    {
      name: "The Essential Jung",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "The Human Condition",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
    {
      name: "The Little Book of Philosophy",
      price: 500,
      id: uniqid(),
      quantity: 1,
    },
  ];

  const cart: RootState = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  function handleClick(product: CartItem) {
    console.log(cart);

    dispatch(addToCart(product));
  }

  return (
    <div className="Shopping-container">
      {Products.map((product) => {
        return (
          <div id={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button onClick={() => handleClick(product)}>Add to cart</button>
          </div>
        );
      })}
      <Link to="/checkoutPage">Checkout</Link>
    </div>
  );
};

export default OrderDashboard;
