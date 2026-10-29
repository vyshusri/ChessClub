import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8081/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
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
            : "Invalid admin email or password"
        );

        setLoading(false);
        return;
      }

      // Save Admin JWT
      localStorage.setItem("token", data.token);

      // Save Admin role
      localStorage.setItem("role", "ADMIN");

      // Go directly to Admin Dashboard
      navigate("/admin-dashboard");

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

      {/* ==============================
          LEFT SIDE
      ============================== */}

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
              Welcome back,<br />
              Administrator.
            </p>

          </div>

          <div className="big-chess-piece">
            ♚
          </div>

        </div>

      </div>


      {/* ==============================
          RIGHT SIDE
      ============================== */}

      <div className="form-section">

        <div className="auth-card">

          <div className="logo-circle">
            ♚
          </div>

          <h2>Admin Login</h2>

          <p className="subtitle">
            Sign in to manage the Chess Club
          </p>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Admin Email</label>

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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter admin password"
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


            {/* ADMIN LOGIN */}

            <button
              type="submit"
              className="gold-button"
              disabled={loading}
            >

              <span>♚</span>

              {loading
                ? "Signing In..."
                : "Admin Sign In"}

            </button>


            {/* STUDENT LOGIN */}

            <button
              type="button"
              className="outline-button"
              style={{ marginTop: "15px" }}
              onClick={() =>
                navigate("/login")
              }
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

export default AdminLogin;