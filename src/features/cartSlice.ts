import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type Action = {
  payload: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state: CartState) => {
      state.items = [];
    },
    addToCart: (state: CartState, action: Action) => {
      console.log(action);
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find(
        (item) => item.name === newItem.name
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    increaseQuantity: (state: CartState, action: { payload: string }) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.name === itemId);

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state: CartState, action: { payload: string }) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.name === itemId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        const itemId = action.payload;
        const itemIndex = state.items.findIndex((item) => item.name === itemId);

        if (itemIndex !== -1) {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    deleteItem: (state: CartState, action: { payload: string }) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.name === itemId);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  emptyCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} = cartSlice.actions;

export default cartSlice.reducer;
