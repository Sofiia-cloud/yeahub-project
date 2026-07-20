import QuizQuestion from "../../features/quiz/ui/QuizQuestion/QuizQuestion";
import QuizResult from "../../features/quiz/ui/QuizResult/QuizResult";
import QuizSetup from "../../features/quiz/ui/QuizSetup/QuizSetup";
import { useAppSelector } from "../../app/store/hooks";
import styles from "./Quiz.module.css";

export default function Quiz() {
  const { isStarted, isFinished } = useAppSelector((state) => state.quiz);

  return (
    <div className={styles.container}>
      {!isStarted && !isFinished && <QuizSetup />}
      {isStarted && !isFinished && <QuizQuestion />}
      {isFinished && <QuizResult />}
    </div>
  );
}
