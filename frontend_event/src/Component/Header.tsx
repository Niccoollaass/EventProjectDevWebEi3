import "./Header.scss";
import { Link,useNavigate } from "react-router-dom";
import type {HeaderProps} from "../utils/types"


export default function Header({ user }: HeaderProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // simple et efficace pour reset l'état
  };
  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* GAUCHE */}
        <nav className="site-header__left">
          <Link className="site-header__link" to="/events">EVENTS</Link>
          <Link className="site-header__link" to="/about">À PROPOS</Link>
          <Link className="site-header__link" to="/contact">CONTACT</Link>
        </nav>

        {/* CENTRE */}
        <div className="site-header__center">
          <Link className="site-header__brand" to="/">
            Event site web
          </Link>
        </div>

        {/* DROITE */}
        <div className="site-header__right">
          {user ? (
            <>
              <button
                className="site-header__logout"
                onClick={handleLogout}
              >
                Se déconnecter de : {user.username}
              </button>
              
            </>
          ) : (
            <Link className="site-header__auth" to="/login">Se connecter</Link>
          )}

          {/* Paramètres */}
          <Link
            to="/parameters"
            className="site-header__iconbtn"
            type="button"
            aria-label="Paramètres"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M19.14 12.94a7.43 7.43 0 0 0 .05-.94 7.43 7.43 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54a7.28 7.28 0 0 0-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.68 8.84a.5.5 0 0 0 .12.64l2.03 1.58a7.43 7.43 0 0 0-.05.94c0 .32.02.63.05.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.38 1.05.7 1.63.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.58-.24 1.13-.56 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          {/* Instagram */}
          <a
            className="site-header__iconbtn"
            href="https://www.instagram.com/nicola.lb/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3a5 5 0 1 1-5 5 5 5 0 0 1 5-5Zm0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm4.5-.9a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
