import { useNavigate, useParams } from "react-router-dom";
import styles from "./Question.module.css";
import DetailedQuestion from "../../features/questions/ui/QuestionDetails/DetailedQuestion";
import DetailedQuestionInfo from "../../features/questions/ui/QuestionInfo/DetailedQuestionInfo";
import { useGetQuestionByIdQuery } from "../../features/questions/api/questionsApi";

function Question() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const id = questionId ? parseInt(questionId, 10) : NaN;
  const { data: question, isLoading, error } = useGetQuestionByIdQuery(id);

  if (!questionId) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.error}>ID вопроса не указан</div>
      </>
    );
  }

  if (isNaN(id)) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.error}>Неверный ID вопроса</div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.loading}>Загрузка вопроса...</div>
      </>
    );
  }

  if (error || !question) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.error}>Вопрос не найден</div>
      </>
    );
  }

  return (
    <>
      <button onClick={() => navigate(-1)} className={styles.link}>
        ← Назад
      </button>

      <DetailedQuestion question={question} />
      <DetailedQuestionInfo question={question} />
    </>
  );
}

export default Question;
