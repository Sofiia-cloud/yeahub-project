

import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../api/authApi';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginForm.module.css';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [login, { isLoading, error }] = useLoginMutation();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Вход</h2>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          className={styles.input}
          placeholder="example@mail.com"
          {...register('email', { 
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат email',
            },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          className={styles.input}
          placeholder="••••••••"
          {...register('password', { 
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен быть не менее 6 символов',
            },
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Войти'}
      </button>

      {error && (
        <div className={styles.errorMessage}>
          Ошибка входа. Проверьте email и пароль.
        </div>
      )}

      <p className={styles.footer}>
        Нет аккаунта? <a href="/register" className={styles.link}>Зарегистрироваться</a>
      </p>
    </form>
  );
};