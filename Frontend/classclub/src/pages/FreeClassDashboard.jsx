import { useNavigate } from "react-router-dom";
import "./FreeClassDashboard.css";

function FreeClassDashboard() {
  const navigate = useNavigate();

  const name = localStorage.getItem("freeClassName");
  const email = localStorage.getItem("freeClassEmail");

  const handleLogout = () => {
    localStorage.removeItem("freeClassToken");
    localStorage.removeItem("freeClassName");
    localStorage.removeItem("freeClassEmail");

    navigate("/free-class-login");
  };

  return (
    <div className="free-dashboard-page">

      {/* Decorative chess pieces */}
      <div className="dashboard-piece dashboard-piece-left">♜</div>
      <div className="dashboard-piece dashboard-piece-right">♞</div>

      <div className="free-dashboard-container">

        {/* Header */}
        <header className="free-dashboard-header">

          <div className="dashboard-brand">
            <span>♟</span>

            <div>
              <strong>CHESS</strong>
              <small>CLUB</small>
            </div>
          </div>

          <button
            className="dashboard-logout-top"
            onClick={handleLogout}
          >
            LOGOUT
          </button>

        </header>

        {/* Main content */}
        <main className="free-dashboard-main">

          <div className="dashboard-welcome">

            <p className="dashboard-eyebrow">
              FREE CLASS MEMBER
            </p>

            <h1>
              Welcome,
              <br />
              <span>{name}.</span>
            </h1>

            <p className="dashboard-description">
              Your chess journey has officially begun.
              Keep learning, keep playing, and make every
              move with confidence.
            </p>

            <div className="dashboard-gold-line"></div>

          </div>

          {/* Account card */}
          <div className="free-dashboard-card">

            <div className="dashboard-card-heading">

              <div className="dashboard-icon">
                ♟
              </div>

              <div>
                <p>MEMBER PROFILE</p>
                <h2>Your Account</h2>
              </div>

            </div>

            <div className="dashboard-divider"></div>

            <div className="dashboard-info">

              <div className="dashboard-info-row">
                <span>NAME</span>
                <strong>{name}</strong>
              </div>

              <div className="dashboard-info-row">
                <span>EMAIL ADDRESS</span>
                <strong>{email}</strong>
              </div>

              <div className="dashboard-info-row">
                <span>MEMBERSHIP</span>
                <strong>FREE CLASS MEMBER</strong>
              </div>

              <div className="dashboard-info-row">
                <span>STATUS</span>
                <strong className="dashboard-status">
                  ● ACTIVE
                </strong>
              </div>

            </div>

            <div className="dashboard-message">
              <span>♔</span>

              <p>
                Your account is ready.
                <br />
                Welcome to the Chess Club.
              </p>
            </div>

          </div>

        </main>

        {/* Bottom quote */}
        <footer className="free-dashboard-footer">

          <div className="dashboard-footer-line"></div>

          <p>
            “Every move is a step toward mastery.”
          </p>

          <div className="dashboard-footer-brand">
            CHESS CLUB &nbsp; • &nbsp; LEARN • PLAY • COMPETE
          </div>

        </footer>

      </div>

    </div>
  );
}

export default FreeClassDashboard;