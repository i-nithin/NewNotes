import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">The simplest way to keep notes </h1>
      <p className="homepage-content">
        Notesy is a simple yet powerful tool,to make you more productive. With
        Notesy note-taking becomes more interesting.
      </p>
      <Link className="homepage-primary-btn" to="/notes">
        {" "}
        Go to Notes{" "}
      </Link>
    </div>
  );
}

export { Home };
