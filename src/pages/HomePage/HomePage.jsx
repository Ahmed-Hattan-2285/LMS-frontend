import "./styles.css";
import LMSProject from "../../assets/images/red-board.svg";
import LMSLogo from "../../assets/images/yellow-board.svg";

export default function HomePage() {
  return (
    <section className="logo-container">
      <div className="home-lms-container">
        <img src={LMSProject} alt="The Learning Management System Project" />
      </div>
      <img src={LMSLogo} alt="Text reads: Learning Management System" />
    </section>
  )
}