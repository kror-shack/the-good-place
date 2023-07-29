type Cart = {
  [heading: string]: CartItem[];
};

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export default function calculateTotalPrice(cart: Cart): number {
  let totalPrice = 0;

  for (const heading in cart) {
    const cartItems = cart[heading];
    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
  }

  return totalPrice;
}
