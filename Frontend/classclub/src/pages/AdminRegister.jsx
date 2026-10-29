import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegister() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8081/api/admin/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          typeof data === "string"
            ? data
            : "Admin registration failed"
        );

        setLoading(false);
        return;
      }

      setMessage(
        "Admin account created successfully!"
      );

      setTimeout(() => {
        navigate("/admin-login");
      }, 1500);

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="chess-showcase">

        <div className="showcase-content">

          <div className="chess-knight">
            ♛
          </div>

          <h1>CHESS CLUB</h1>

          <p className="tagline">
            ADMINISTRATION
          </p>

          <div className="gold-line"></div>

          <div className="showcase-message">

            <span>♔</span>

            <p>
              Manage the club.<br />
              Lead the players.<br />
              Shape the game.
            </p>

          </div>

          <div className="big-chess-piece">
            ♚
          </div>

          <p className="champions">
            ♛<br />
            The game is yours to manage.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="form-section">

        <div className="auth-card">

          <div className="logo-circle">
            ♚
          </div>

          <h2>Admin Registration</h2>

          <p className="subtitle">
            Create your Chess Club administrator account
          </p>


          <form onSubmit={handleRegister}>

            {/* NAME */}

            <div className="input-group">

              <label>Admin Name</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ♙
                </span>

                <input
                  type="text"
                  placeholder="Enter admin name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create admin password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>

              </div>

            </div>


            {/* MESSAGE */}

            {message && (
              <div className="message">
                {message}
              </div>
            )}


            {/* REGISTER */}

            <button
              type="submit"
              className="gold-button"
              disabled={loading}
            >

              <span>♚</span>

              {loading
                ? "Creating Admin..."
                : "Create Admin Account"}

            </button>


            <div className="divider">

              <span></span>

              <p>OR</p>

              <span></span>

            </div>


            <p className="account-text">
              Already an administrator?
            </p>


            <button
              type="button"
              className="outline-button"
              onClick={() => navigate("/admin-login")}
            >
              Admin Sign In
            </button>


            <button
              type="button"
              className="outline-button"
              style={{ marginTop: "10px" }}
              onClick={() => navigate("/login")}
            >
              Student Login
            </button>

          </form>

        </div>


        <div className="footer">
          ♛ &nbsp; © 2026 Chess Club. All rights reserved.
        </div>

      </div>

    </div>
  );
}

export default AdminRegister;