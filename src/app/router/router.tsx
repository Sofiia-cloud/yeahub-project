import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Main from "./pages/Main";
import Question from "./pages/Question/Question";
import Quiz from "./pages/Quiz/Quiz";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: ":questionId",
        element: <Question />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
    ],
  },
]);
