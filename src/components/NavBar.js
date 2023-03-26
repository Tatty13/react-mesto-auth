import { NavLink, useLocation } from "react-router-dom";

function NavBar({ isLoggedIn, isOpen, email, onSignout }) {
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
      <button className="nav__btn" type="button" onClick={onSignout}>
        Выйти
      </button>
    );

  return (
    <nav className={`${isLoggedIn && "nav"} ${isOpen && "nav_open"}`}>
      <ul className={`nav__list ${isLoggedIn && "nav__list_place_burger"}`}>
        {isLoggedIn && (
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
