import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../../../features/auth/api/authApi";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Регистрация</h2>

      <div className={styles.field}>
        <label className={styles.label}>Имя пользователя</label>
        <input
          type="text"
          className={styles.input}
          placeholder="username"
          {...register("username", {
            required: "Имя пользователя обязательно",
            minLength: {
              value: 3,
              message: "Имя должно содержать минимум 3 символа",
            },
            maxLength: {
              value: 20,
              message: "Имя не должно превышать 20 символов",
            },
          })}
        />
        {errors.username && (
          <span className={styles.error}>{errors.username.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          className={styles.input}
          placeholder="example@mail.com"
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неверный формат email",
            },
          })}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
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
            minLength: {
              value: 6,
              message: "Пароль должен быть не менее 6 символов",
            },
          })}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Подтверждение пароля</label>
        <input
          type="password"
          className={styles.input}
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Подтвердите пароль",
            validate: (value) =>
              value === watch("password") || "Пароли не совпадают",
          })}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
      </button>

      {error && (
        <div className={styles.errorMessage}>
          Ошибка регистрации. Попробуйте снова.
        </div>
      )}

      <p className={styles.footer}>
        Уже есть аккаунт?{" "}
        <a href="/login" className={styles.link}>
          Войти
        </a>
      </p>
    </form>
  );
};
