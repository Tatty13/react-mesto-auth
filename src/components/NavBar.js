import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function NavBar({ isloggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const path = useLocation().pathname;

  const navElement =
    path === "/sign-in" ? (
      <NavLink to="/sign-up" className="nav__link">
        Регистрация
      </NavLink>
    ) : path === "/sign-up" ? (
      <NavLink to="/sign-up" className="nav__link">
        Войти
      </NavLink>
    ) : (
      <button className="nav__btn" type="button">
        Выйти
      </button>
    );

  return (
    <nav>
      <ul className="nav__list">
        {isloggedIn && (
          <li>
            <span>{currentUser.email}</span>
          </li>
        )}
        <li>{navElement}</li>
      </ul>
    </nav>
  );
}

export default NavBar;
