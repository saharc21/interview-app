import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/Counter/counterSlice";
import successfullReducer from "./components/Helpers/succesfullSlice";
import failureReducer from "./components/Helpers/failureSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    successfull: successfullReducer,
    failure: failureReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
