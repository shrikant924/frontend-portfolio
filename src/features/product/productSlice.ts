import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  totalQty: number;
}

const initialState: CartState = {
  items: [],
  totalQty: 0,
};

const productCartSlice = createSlice({
  name: 'productCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);

      if (existingItem) {
        existingItem.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }

      state.totalQty += action.payload.qty;
    },

    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.productId === action.payload);

      if (item) {
        item.qty += 1;
        state.totalQty += 1;
      }
    },

    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.productId === action.payload);

      if (item && item.qty > 1) {
        item.qty -= 1;
        state.totalQty -= 1;
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.productId === action.payload);

      if (item) {
        state.totalQty -= item.qty;
      }

      state.items = state.items.filter((item) => item.productId !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQty = 0;
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } =
  productCartSlice.actions;

export default productCartSlice.reducer;
