import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

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
        "http://localhost:8081/api/users/register",
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
            : "Registration failed"
        );

        setLoading(false);
        return;
      }

      setMessage("Account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

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

      <div className="chess-showcase register-showcase">

        <div className="showcase-content">

          <div className="chess-knight">
            ♞
          </div>

          <h1>CHESS CLUB</h1>

          <p className="tagline">
            Think. Strategize. Conquer.
          </p>

          <div className="gold-line"></div>

          <div className="showcase-message">

            <span>♛</span>

            <p>
              Your next<br />
              great move<br />
              starts here.
            </p>

          </div>

          <div className="big-chess-piece">
            ♟
          </div>

          <p className="champions">

            ♛<br />

            Join the club<br />
            of champions.

          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="form-section">

        <div className="auth-card register-card">

          <div className="logo-circle">
            ♞
          </div>

          <h2>Create Account</h2>

          <p className="subtitle">
            Become a member of our Chess Club
          </p>


          <form onSubmit={handleRegister}>


            {/* NAME */}

            <div className="input-group">

              <label>Full Name</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ♙
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
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


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="gold-button"
              disabled={loading}
            >

              <span>♞</span>

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>


            {/* OR */}

            <div className="divider">

              <span></span>

              <p>OR</p>

              <span></span>

            </div>


            <p className="account-text">
              Already have an account?
            </p>


            <button
              type="button"
              className="outline-button"
              onClick={() => navigate("/login")}
            >

              <span>↪</span>

              Sign In

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

export default Register;