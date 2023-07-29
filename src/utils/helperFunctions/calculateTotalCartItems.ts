interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

type Cart = {
  [heading: string]: CartItem[];
};

export default function calculateTotalCartItems(cart: Cart): number {
  let totalItems = 0;

  for (const heading in cart) {
    const cartItems = cart[heading];
    for (const item of cartItems) {
      totalItems += item.quantity;
    }
  }

  return totalItems;
}
