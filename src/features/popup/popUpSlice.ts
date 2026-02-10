import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PopUpState {
  message: string | null;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

const initialState: PopUpState = {
  message: null,
  type: 'info',
  visible: false,
};

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    showPopUp: (
      state,
      action: PayloadAction<{ message: string; type?: 'success' | 'error' | 'info' }>,
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
      state.visible = true;
    },

    hidePopUp: (state) => {
      state.visible = false;
      state.message = null;
    },
  },
});

export const { showPopUp, hidePopUp } = popUpSlice.actions;
export default popUpSlice.reducer;
