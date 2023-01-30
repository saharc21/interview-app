import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface FailureState {
  value: boolean;
}

// Define the initial state using that type
const initialState: FailureState = {
  value: false,
};

export const failureSlice = createSlice({
  name: "failure",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeFailureValue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeFailureValue } = failureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFailure = (state: RootState) => state.failure.value;

export default failureSlice.reducer;
