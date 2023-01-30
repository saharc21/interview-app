import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface SuccessfullState {
  value: boolean;
}

// Define the initial state using that type
const initialState: SuccessfullState = {
  value: false,
};

export const successfullSlice = createSlice({
  name: "successfull",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeSuccessfullValue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeSuccessfullValue } = successfullSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSuccessfull = (state: RootState) => state.successfull.value;

export default successfullSlice.reducer;
