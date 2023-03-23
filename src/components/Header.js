import NavBar from "./NavBar";

function Header({ isloggedIn, email, onSignput }) {
  return (
    <header className="header">
      <a className="logo" href="#root" aria-label="Логотип">
        {" "}
      </a>
      <NavBar isloggedIn={isloggedIn} email={email} onSignput={onSignput} />
    </header>
  );
}

export default Header;
