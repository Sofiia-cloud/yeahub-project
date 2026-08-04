
import { RegisterForm } from '../../features/auth/ui/RegisterForm/RegisterForm';
import styles from './Register.module.css';

const Register = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default Register;