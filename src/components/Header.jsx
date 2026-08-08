import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/">
        #VANLIFE
        {/* <img src="./assets/logog.svg" alt="vanlife-logo" /> */}
      </Link>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/vans">Vans</Link>
      </nav>
    </header>
  );
}
