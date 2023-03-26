import { useState } from "react";
import NavBar from "./NavBar";
import BurgerBtn from "./BurgerBtn";

function Header({ isloggedIn, email, onSignout }) {
  const [isNavBarOpen, setNavBarState] = useState(false);

  function handleOpenBurgerMenu() {
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
        isloggedIn={isloggedIn}
        isOpen={isNavBarOpen}
        email={email}
        onSignout={handleSignout}
      />

      {isloggedIn && (
      <BurgerBtn onClick={handleOpenBurgerMenu} isOpen={isNavBarOpen} />
      )}
    </header>
  );
}

export default Header;
