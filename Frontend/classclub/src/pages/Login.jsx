import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8081/api/users/login",
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
            : "Invalid email or password"
        );

        setLoading(false);
        return;
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      // Go to profile
      navigate("/profile");

    } catch (error) {

      console.error(error);

      setMessage("Unable to connect to the server.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="chess-showcase">

        <div className="showcase-content">

          <div className="chess-knight">♞</div>

          <h1>CHESS CLUB</h1>

          <p className="tagline">
            Think. Strategize. Conquer.
          </p>

          <div className="gold-line"></div>

          <div className="showcase-message">

            <span>♛</span>

            <p>
              Every move<br />
              brings you<br />
              closer to victory.
            </p>

          </div>

          <div className="big-chess-piece">
            ♟
          </div>

          <p className="champions">
            ♛<br />
            Join the club of champions.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="form-section">

        <div className="auth-card">

          <div className="logo-circle">
            ♟
          </div>

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Sign in to continue your chess journey
          </p>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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


            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember">

                <input type="checkbox" />

                <span>Remember me</span>

              </label>

              <button
                type="button"
                className="forgot"
                onClick={() =>
                  setMessage(
                    "Please contact the Chess Club administrator to reset your password."
                  )
                }
              >
                Forgot Password?
              </button>

            </div>


            {/* MESSAGE */}

            {message && (
              <div className="message">
                {message}
              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="gold-button"
              disabled={loading}
            >

              <span>♟</span>

              {loading ? "Signing In..." : "Sign In"}

            </button>


            {/* OR */}

            <div className="divider">

              <span></span>

              <p>OR</p>

              <span></span>

            </div>


            {/* REGISTER */}

            <p className="account-text">
              Don't have an account?
            </p>

            <button
              type="button"
              className="outline-button"
              onClick={() => navigate("/register")}
            >
              <span>♙</span>
              Create an Account
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

export default Login;