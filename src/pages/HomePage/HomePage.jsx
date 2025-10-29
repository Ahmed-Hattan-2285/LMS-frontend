import "./styles.css";
import LMSLogo from "../../assets/images/yellow-board.svg";

export default function HomePage() {
  return (
    <section className="logo-container">
      <div className="home-lms-container">
        <h1>Learning Management System</h1>
        <p className="page-content">
          Welcome to the Learning Management System.
        </p>
      </div>
      <img src={LMSLogo} alt="Text reads: Learning Management System" />
    </section>
  )
}