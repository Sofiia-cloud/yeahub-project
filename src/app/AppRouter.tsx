import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "../widgets/AuthGuard/AuthGuard";
import Main from "../pages/Main/Main";
import Question from "../pages/Question/Question";
import QuizPage from "../pages/Quiz/Quiz";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Layout from "./layouts/MainLayout/MainLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/login"
            element={
              <AuthGuard requireAuth={false}>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="/register"
            element={
              <AuthGuard requireAuth={false}>
                <Register />
              </AuthGuard>
            }
          />
          <Route
            path="/"
            element={
              <AuthGuard requireAuth={false}>
                <Main />
              </AuthGuard>
            }
          />
          <Route
            path="/:questionId"
            element={
              <AuthGuard requireAuth>
                <Question />
              </AuthGuard>
            }
          />
          <Route
            path="/quiz"
            element={
              <AuthGuard requireAuth>
                <QuizPage />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
