import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { useLoginMutation } from "../../api/authApi";
import { selectIsAuthenticated } from "../../model/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./LoginForm.module.css";

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [login, { isLoading }] = useLoginMutation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      await login({
        username: data.username,
        password: data.password,
      }).unwrap();
    } catch (err: any) {
      if (err?.status === 401) {
        setServerError("Неверное имя пользователя или пароль.");
      } else {
        setServerError(err?.data?.message || "Ошибка входа. Попробуйте снова.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Вход</h2>

      <div className={styles.field}>
        <label className={styles.label}>Имя пользователя</label>
        <input
          type="text"
          className={styles.input}
          placeholder="username"
          {...register("username", {
            required: "Введите имя пользователя",
          })}
        />
        {errors.username && (
          <span className={styles.error}>{errors.username.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          className={styles.input}
          placeholder="••••••••"
          {...register("password", {
            required: "Пароль обязателен",
          })}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? "Загрузка..." : "Войти"}
      </button>

      {serverError && <div className={styles.errorMessage}>{serverError}</div>}

      <p className={styles.footer}>
        Нет аккаунта?{" "}
        <a href="/register" className={styles.link}>
          Зарегистрироваться
        </a>
      </p>
    </form>
  );
};
