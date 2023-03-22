import NavBar from "./NavBar";

function Header({ isloggedIn }) {
  return (
    <header className="header">
      <a className="logo" href="#root" aria-label="Логотип">
        {" "}
      </a>
      <NavBar isloggedIn={isloggedIn} />
    </header>
  );
}

export default Header;
