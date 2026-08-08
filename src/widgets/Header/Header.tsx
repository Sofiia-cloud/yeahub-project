import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

import logo from "../../shared/icons/logo.png";
import yeahub from "../../shared/icons/logo_Yeahub.png";
import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import { selectIsAuthenticated } from "../../features/auth/model/authSlice";
import { useLogoutMutation } from "../../features/auth/api/authApi";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainer__logo}>
          <img src={logo} alt="Logo image" />
          <img src={yeahub} alt="Yeahub logo" />
        </div>

        <nav className={styles.headerContainer__links}>
          <Link to="/">База вопросов</Link>
          <Link to="/quiz">Тренажер</Link>
          <a href="#">Материалы</a>
        </nav>

        <div className={styles.headerContainer__buttons}>
          {isAuthenticated ? (
            <>
              <button className={styles.loginBtn} onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={styles.loginBtn}>Вход</button>
              </Link>
              <Link to="/register">
                <button className={styles.registerBtn}>Регистрация</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
