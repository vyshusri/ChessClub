import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLeads: 0,
  });

  const [loading, setLoading] = useState(true);

  // Free Class Bookings
  const [freeBookings, setFreeBookings] = useState([]);
  const [freeBookingsLoading, setFreeBookingsLoading] = useState(true);
  const [updatingBookingId, setUpdatingBookingId] = useState(null);

  // Meeting link inputs
  const [meetingLinks, setMeetingLinks] = useState({});

  // Load dashboard statistics
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetch("http://localhost:8081/api/admin/dashboard/stats", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load dashboard");
        }

        return response.json();
      })
      .then((data) => {
        setStats({
          totalStudents: data.totalStudents || 0,
          totalLeads: data.totalLeads || 0,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [navigate]);

  // Load Free Class Bookings
  const loadFreeBookings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    try {
      setFreeBookingsLoading(true);

      const response = await fetch(
        "http://localhost:8081/api/admin/free-bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load free-class bookings");
      }

      const data = await response.json();

      setFreeBookings(data);
    } catch (error) {
      console.error("Free bookings error:", error);
    } finally {
      setFreeBookingsLoading(false);
    }
  };

  useEffect(() => {
    loadFreeBookings();
  }, []);

  // Handle meeting link input
  const handleMeetingLinkChange = (bookingId, value) => {
    setMeetingLinks((previous) => ({
      ...previous,
      [bookingId]: value,
    }));
  };

  // Confirm Free Class
  const handleConfirmBooking = async (booking) => {
    const token = localStorage.getItem("token");

    const meetingLink = meetingLinks[booking.id];

    if (!meetingLink || meetingLink.trim() === "") {
      alert("Please enter the meeting link.");
      return;
    }

    if (
      !meetingLink.startsWith("http://") &&
      !meetingLink.startsWith("https://")
    ) {
      alert("Please enter a valid meeting link starting with http:// or https://");
      return;
    }

    try {
      setUpdatingBookingId(booking.id);

      const response = await fetch(
        `http://localhost:8081/api/admin/free-bookings/${booking.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meetingLink: meetingLink.trim(),
            status: "CONFIRMED",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to confirm the booking"
        );
      }

      alert(
        `Class confirmed successfully.\nConfirmation email sent to ${booking.email}`
      );

      // Reload bookings
      await loadFreeBookings();

      // Remove input value
      setMeetingLinks((previous) => {
        const updated = { ...previous };
        delete updated[booking.id];
        return updated;
      });
    } catch (error) {
      console.error("Confirm booking error:", error);
      alert(error.message || "Unable to confirm booking.");
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">
          ♟
          <span>Chess Club</span>
        </div>

        <div className="admin-label">
          ADMIN PANEL
        </div>

        <nav>

          <button
            className="active"
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </button>

          <button onClick={() => navigate("/add-student")}>
            Students
          </button>

          <button>
            Leads
          </button>

          <button>
            Training
          </button>

          <button>
            Events
          </button>

          <button>
            Resources
          </button>

          <button
            onClick={() =>
              navigate("/landing-page-management")
            }
          >
            Landing Page
          </button>

        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-content">

        <header className="dashboard-header">

          <div>
            <p className="small-title">
              CHESS CLUB MANAGEMENT
            </p>

            <h1>
              Admin Dashboard
            </h1>
          </div>

          <div className="admin-profile">
            ♔
            <span>Administrator</span>
          </div>

        </header>


        {/* STATISTICS */}

        <section className="stats">

          <div className="stat-card">

            <div className="stat-icon">
              ♟
            </div>

            <div>
              <p>Total Students</p>

              <h2>
                {loading ? "..." : stats.totalStudents}
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✉
            </div>

            <div>
              <p>Total Leads</p>

              <h2>
                {loading ? "..." : stats.totalLeads}
              </h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ♜
            </div>

            <div>
              <p>Training</p>

              <h2>0</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ★
            </div>

            <div>
              <p>Events</p>

              <h2>0</h2>
            </div>

          </div>

        </section>


        {/* FREE CLASS BOOKINGS */}

        <section className="free-bookings-section">

          <div className="free-bookings-header">

            <div>
              <p className="small-title">
                FREE CLASS MANAGEMENT
              </p>

              <h2>
                Free Class Bookings
              </h2>

              <p className="description">
                Review registrations, confirm classes and provide
                the session meeting link.
              </p>
            </div>

            <button
              className="refresh-bookings-button"
              onClick={loadFreeBookings}
            >
              ↻ Refresh
            </button>

          </div>


          {freeBookingsLoading ? (

            <div className="free-bookings-message">
              Loading free-class bookings...
            </div>

          ) : freeBookings.length === 0 ? (

            <div className="free-bookings-message">
              No free-class bookings found.
            </div>

          ) : (

            <div className="free-bookings-table-wrapper">

              <table className="free-bookings-table">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Class Time</th>
                    <th>Status</th>
                    <th>Meeting Link</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {freeBookings.map((booking) => (

                    <tr key={booking.id}>

                      <td>
                        <strong>
                          {booking.name}
                        </strong>
                      </td>

                      <td>
                        {booking.email}
                      </td>

                      <td>
                        {booking.phone}
                      </td>

                      <td>
                        {booking.sectionTime}
                      </td>

                      <td>

                        <span
                          className={
                            booking.status === "CONFIRMED"
                              ? "booking-status confirmed"
                              : "booking-status pending"
                          }
                        >
                          {booking.status || "PENDING"}
                        </span>

                      </td>

                      <td>

                        {booking.meetingLink ? (

                          <a
                            href={booking.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meeting-link"
                          >
                            Open Link
                          </a>

                        ) : (

                          <span className="no-link">
                            Not added
                          </span>

                        )}

                      </td>

                      <td>

                        {booking.status === "CONFIRMED" ? (

                          <span className="confirmed-label">
                            ✓ Confirmed
                          </span>

                        ) : (

                          <div className="booking-action">

                            <input
                              type="url"
                              placeholder="Paste meeting link"
                              value={
                                meetingLinks[booking.id] || ""
                              }
                              onChange={(event) =>
                                handleMeetingLinkChange(
                                  booking.id,
                                  event.target.value
                                )
                              }
                              className="meeting-link-input"
                            />

                            <button
                              className="confirm-booking-button"
                              onClick={() =>
                                handleConfirmBooking(booking)
                              }
                              disabled={
                                updatingBookingId === booking.id
                              }
                            >
                              {updatingBookingId === booking.id
                                ? "Confirming..."
                                : "Confirm Class"}
                            </button>

                          </div>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* MANAGEMENT */}

        <section className="management">

          <h2>
            Quick Management
          </h2>

          <p className="description">
            Manage your Chess Club from one place.
          </p>


          <div className="management-grid">

            {/* ADD STUDENT */}

            <div
              className="management-card"
              onClick={() => navigate("/add-student")}
            >

              <div className="management-icon">
                ♟
              </div>

              <h3>
                Add Student
              </h3>

              <p>
                Create a training student account.
              </p>

              <span>
                Open →
              </span>

            </div>


            {/* ADD ADMIN */}

            <div
              className="management-card"
              onClick={() => navigate("/add-admin")}
            >

              <div className="management-icon">
                ♔
              </div>

              <h3>
                Add Admin
              </h3>

              <p>
                Create another administrator account.
              </p>

              <span>
                Open →
              </span>

            </div>


            {/* LEADS */}

            <div className="management-card">

              <div className="management-icon">
                ✉
              </div>

              <h3>
                Manage Leads
              </h3>

              <p>
                View Contact Us enquiries.
              </p>

              <span>
                Coming next →
              </span>

            </div>


            {/* LANDING PAGE */}

            <div
              className="management-card"
              onClick={() =>
                navigate("/landing-page-management")
              }
            >

              <div className="management-icon">
                ◈
              </div>

              <h3>
                Landing Page
              </h3>

              <p>
                Manage landing page content.
              </p>

              <span>
                Open →
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;