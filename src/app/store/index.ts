import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../shared/api/baseApi";
import quizReducer from "./slices/quizSlice";
import interviewReducer from "./slices/interviewSlice";
import authReducer from '../../features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    quiz: quizReducer,
    interview: interviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

