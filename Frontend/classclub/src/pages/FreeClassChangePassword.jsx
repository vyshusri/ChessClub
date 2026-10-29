import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreeClassChangePassword.css";

function FreeClassChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must contain at least 6 characters.");
      return;
    }

    const token = localStorage.getItem("freeClassToken");

    if (!token) {
      setError("Your session has expired. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/free-class/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Password change failed."
        );
      }

      setSuccess("Password changed successfully!");

      setTimeout(() => {
        navigate("/free-class-dashboard");
      }, 1000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">

      {/* Decorative chess pieces */}
      <div className="change-password-piece piece-one">♜</div>
      <div className="change-password-piece piece-two">♞</div>

      <div className="change-password-container">

        {/* LEFT SIDE */}
        <div className="change-password-intro">

          <div className="change-password-brand">
            <span>♟</span>

            <div>
              <strong>CHESS</strong>
              <small>CLUB</small>
            </div>
          </div>

          <p className="change-password-eyebrow">
            FIRST LOGIN • SECURITY
          </p>

          <h1>
            Make Your
            <br />
            <span>Next Move.</span>
          </h1>

          <p className="change-password-description">
            Your temporary password has helped you enter the
            club. Now create a personal password to keep your
            account secure.
          </p>

          <div className="change-password-line"></div>

          <div className="security-note">
            <span>♔</span>
            <div>
              <strong>Your account, your move.</strong>
              <p>
                Choose a password that you can remember
                and keep it private.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="change-password-card">

          <div className="change-password-card-header">

            <div className="change-password-icon">
              ♟
            </div>

            <div>
              <p>ACCOUNT SECURITY</p>
              <h2>Change Password</h2>
            </div>

          </div>

          <div className="change-password-divider"></div>

          <p className="change-password-subtitle">
            Create a new password before continuing to your
            Free Class Dashboard.
          </p>

          <form onSubmit={handleChangePassword}>

            <div className="change-password-field">
              <label>Current Password</label>

              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="change-password-field">
              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="change-password-field">
              <label>Confirm New Password</label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="password-requirement">
              <span>✓</span>
              <p>Password must contain at least 6 characters.</p>
            </div>

            {error && (
              <div className="change-password-error">
                {error}
              </div>
            )}

            {success && (
              <div className="change-password-success">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "CHANGING PASSWORD..."
                : "UPDATE PASSWORD  →"}
            </button>

          </form>

          <div className="change-password-footer">
            <span>CHESS CLUB</span>
            <span>•</span>
            <span>LEARN • PLAY • COMPETE</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default FreeClassChangePassword;