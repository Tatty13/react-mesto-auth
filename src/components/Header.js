import { useState } from "react";
import NavBar from "./NavBar";
import BurgerBtn from "./BurgerBtn";

function Header({ isLoggedIn, email, onSignout }) {
  const [isNavBarOpen, setNavBarState] = useState(false);

  function toggleBurgerMenu() {
    setNavBarState(!isNavBarOpen);
  }

  function handleSignout() {
    onSignout();
    setNavBarState(false);
  }

  return (
    <header className="header">
      <a className="logo" href="#root" aria-label="Логотип">
        {" "}
      </a>
      <NavBar
        isLoggedIn={isLoggedIn}
        isOpen={isNavBarOpen}
        email={email}
        onSignout={handleSignout}
      />

      {isLoggedIn && (
        <BurgerBtn onClick={toggleBurgerMenu} isOpen={isNavBarOpen} />
      )}
    </header>
  );
}

export default Header;
