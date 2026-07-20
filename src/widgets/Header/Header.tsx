import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import logo from "../../shared/icons/logo.png";
import yeahub from "../../shared/icons/logo_Yeahub.png";
function Header() {
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
          <button className={styles.loginBtn}>Вход</button>
          <button className={styles.registerBtn}>Регистрация</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
