import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreeClassLogin.css";

function FreeClassLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/free-class/login",
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
        throw new Error(
          data.message || "Invalid email or password"
        );
      }

      localStorage.setItem("freeClassToken", data.token);
      localStorage.setItem("freeClassName", data.name);
      localStorage.setItem("freeClassEmail", data.email);

      if (data.mustChangePassword) {
        navigate("/free-class/change-password");
      } else {
        navigate("/free-class-dashboard");
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="free-login-page">

      {/* Decorative chess pieces */}
      <div className="free-login-piece piece-left">♜</div>
      <div className="free-login-piece piece-right">♞</div>

      <div className="free-login-container">

        {/* LEFT SIDE */}
        <div className="free-login-intro">

          <div className="free-login-brand">
            <span>♟</span>
            <div>
              <strong>CHESS</strong>
              <small>CLUB</small>
            </div>
          </div>

          <p className="free-login-eyebrow">
            FREE CLASS MEMBER
          </p>

          <h1>
            Your Game.
            <br />
            <span>Your Journey.</span>
          </h1>

          <p className="free-login-description">
            Welcome back to the Chess Club. Continue learning,
            improving and making your next move with confidence.
          </p>

          <div className="free-login-line"></div>

          <p className="free-login-quote">
            "Every move is a step toward mastery."
          </p>

        </div>


        {/* RIGHT SIDE */}
        <div className="free-login-card">

          <div className="free-login-card-top">

            <div className="free-login-icon">
              ♟
            </div>

            <div>
              <p>WELCOME BACK</p>
              <h2>Free Class Login</h2>
            </div>

          </div>


          <div className="free-login-divider"></div>


          <p className="free-login-subtitle">
            Sign in to continue your chess journey.
          </p>


          <form onSubmit={handleLogin}>

            <div className="free-login-field">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            <div className="free-login-field">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            {error && (
              <div className="free-login-error">
                {error}
              </div>
            )}


            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "SIGNING IN..." : "SIGN IN  →"}
            </button>

          </form>


          <div className="free-login-help">

            <span>♟</span>

            <p>
              First time logging in?
              <br />
              Your temporary password is your registered phone number.
            </p>

          </div>


          <div className="free-login-footer">
            <span>CHESS CLUB</span>
            <span>•</span>
            <span>LEARN • PLAY • COMPETE</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default FreeClassLogin;