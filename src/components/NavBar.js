import { NavLink, useLocation } from "react-router-dom";

function NavBar({ isloggedIn, email, onSignput }) {
  const path = useLocation().pathname;

  const navElement =
    path === "/sign-in" ? (
      <NavLink to="/sign-up" className="nav__link">
        Регистрация
      </NavLink>
    ) : path === "/sign-up" ? (
      <NavLink to="/sign-in" className="nav__link">
        Войти
      </NavLink>
    ) : (
      <button className="nav__btn" type="button" onClick={onSignput}>
        Выйти
      </button>
    );

  return (
    <nav>
      <ul className="nav__list">
        {isloggedIn && (
          <li>
            <span>{email}</span>
          </li>
        )}
        <li>{navElement}</li>
      </ul>
    </nav>
  );
}

export default NavBar;
