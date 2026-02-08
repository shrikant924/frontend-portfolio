import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseCount: (state) => {
      state.count += 1;
    },
    decraseCount: (state) => {
      state.count -= 1;
    },
  },
});

export const { increaseCount, decraseCount } = cartSlice.actions;
export default cartSlice.reducer;
