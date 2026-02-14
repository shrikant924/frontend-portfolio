import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: sessionStorage.getItem('id'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; id: string }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.id;
      localStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('id', action.payload.id);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      sessionStorage.removeItem('id');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
