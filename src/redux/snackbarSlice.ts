// snackbarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarState } from './interface';

const initialState: SnackbarState = {
  message: '',
  open: false,
  gameEnded: false
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.message = action.payload;
      state.open = true;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
    endGame: (state, action) => {
        state.message = action.payload;
        state.gameEnded = true;
        state.open = true;
    }
  },
});

export const { showSnackbar, hideSnackbar, endGame } = snackbarSlice.actions;
export default snackbarSlice.reducer;
