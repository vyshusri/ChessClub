
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  // ==========================================
  // DEFAULT LANDING PAGE CONTENT
  // ==========================================

  const defaultContent = {
    heroTitle: "Your Move. Your Victory.",
    heroDescription:
      "Where strategy meets passion. Learn, compete and master the game of chess with a community of ambitious players.",
    heroIcon: "♟",

    learnTitle: "Learn",
    learnDescription:
      "Build strong fundamentals and improve your understanding of chess through structured training.",
    learnIcon: "♟",

    competeTitle: "Compete",
    competeDescription:
      "Participate in tournaments, challenges and exciting chess events.",
    competeIcon: "♞",

    masterTitle: "Master",
    masterDescription:
      "Sharpen your strategic thinking and become a stronger, more confident player.",
    masterIcon: "♛",

    trainingTitle: "Chess Training",
    trainingInfo:
      "Professional chess training for players of all levels.",
    trainingIcon: "♜",

    freeClassTitle:
      "Your Chess Journey Starts Here.",
    freeClassInfo:
      "Book your free chess class today.",
    freeClassIcon: "♟",

    eventsTitle: "Club Events",

    event1Title:
      "Monthly Chess Tournament",
    event1Description:
      "Test your skills against fellow club members.",
    event1Icon: "♟",

    event2Title:
      "Rapid Chess Championship",
    event2Description:
      "Fast decisions. Sharp tactics. Maximum excitement.",
    event2Icon: "♞",

    event3Title:
      "Chess Workshop",
    event3Description:
      "Learn advanced techniques from experienced players.",
    event3Icon: "♛",

    contactInfo:
      "Have a question about our chess club? We'd love to hear from you.",
    emailIcon: "✉",
    phoneIcon: "☎"
  };

  // ==========================================
  // STATE
  // ==========================================

  const [landingContent, setLandingContent] =
    useState(defaultContent);

  const [landingLoading, setLandingLoading] =
    useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

    const [freeBookingData, setFreeBookingData] = useState({
  name: "",
  email: "",
  phone: "",
  sectionTime: ""
});

const [bookingSuccess, setBookingSuccess] = useState("");
const [bookingError, setBookingError] = useState("");
const [bookingLoading, setBookingLoading] = useState(false);
  // ==========================================
  // MEDIA RENDERING
  // ==========================================

  const renderMedia = (value, className = "") => {
    if (!value) {
      return null;
    }

    const isImage =
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("data:image/") ||
      value.startsWith("/uploads/");

    if (isImage) {
      return (
        <img
          src={value}
          alt="Chess Club"
          className={className}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return (
      <span className={className}>
        {value}
      </span>
    );
  };

  // ==========================================
  // LOAD LANDING PAGE CONTENT
  // ==========================================

  useEffect(() => {
    const loadLandingContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/landing-page"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load landing page. Status: " +
              response.status
          );
        }

        const data = await response.json();

        setLandingContent({
          ...defaultContent,
          ...data
        });
      } catch (error) {
        console.error(
          "Landing page error:",
          error
        );

        setLandingContent(defaultContent);
      } finally {
        setLandingLoading(false);
      }
    };

    loadLandingContent();
  }, []);

  // ==========================================
  // CONTACT FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // ==========================================
  // CONTACT FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "http://localhost:8081/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to submit enquiry. Status: " +
            response.status
        );
      }

      setSuccessMessage(
        "Thank you! Your enquiry has been submitted successfully."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setErrorMessage(
        "Something went wrong. Please try again."
      );
    }
  };

  const handleFreeBookingChange = (e) => {
  const { name, value } = e.target;

  setFreeBookingData((previous) => ({
    ...previous,
    [name]: value
  }));
};

const handleFreeBookingSubmit = async (e) => {
  e.preventDefault();

  setBookingSuccess("");
  setBookingError("");
  setBookingLoading(true);

  try {
    const response = await fetch(
      "http://localhost:8081/api/free-bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(freeBookingData)
      }
    );

    const contentType =
  response.headers.get("content-type") || "";

const data = contentType.includes("application/json")
  ? await response.json()
  : await response.text();

if (!response.ok) {
  throw new Error(
    typeof data === "string"
      ? data
      : data.message || "Booking failed."
  );
}

    setBookingSuccess(
      "Your free class has been booked successfully. Check your email for confirmation."
    );

    setFreeBookingData({
      name: "",
      email: "",
      phone: "",
      sectionTime: ""
    });

  } catch (error) {
    console.error("Free booking error:", error);

    setBookingError(
      error.message || "Something went wrong. Please try again."
    );
  } finally {
    setBookingLoading(false);
  }
};

  // ==========================================
  // LOADING
  // ==========================================

  if (landingLoading) {
    return (
      <div className="home">
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h2>Loading Chess Club...</h2>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">

          <span className="logo-symbol">
            {renderMedia(
              landingContent.heroIcon,
              "logo-media"
            )}
          </span>

          <span>CHESS</span>
          <small> CLUB</small>

        </div>

        <div className="nav-links">

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#training">Training</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>

        </div>

        <div className="nav-buttons">

          <Link
            to="/login"
            className="nav-login"
          >
            Student Login
          </Link>

          <Link
            to="/admin-login"
            className="nav-admin"
          >
            Admin
          </Link>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="hero-small">
            WELCOME TO OUR CHESS CLUB
          </p>

          <h1>
            {landingContent.heroTitle}
          </h1>

          <p className="hero-description">
            {landingContent.heroDescription}
          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-btn"
            >
              Join the Club
            </Link>

            <a
              href="#training"
              className="secondary-btn"
            >
              Explore Trainings
            </a>

          </div>

        </div>

        <div className="hero-chess">

          <div className="chess-symbol">

            {renderMedia(
              landingContent.heroIcon,
              "hero-media"
            )}

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section
        className="about"
        id="about"
      >

        <div className="section-heading">

          <p>WHO WE ARE</p>

          <h2>
            More Than Just A Game
          </h2>

        </div>

        <div className="about-content">

          <div className="about-card">

            <div className="about-icon">

              {renderMedia(
                landingContent.learnIcon,
                "about-media"
              )}

            </div>

            <h3>
              {landingContent.learnTitle}
            </h3>

            <p>
              {landingContent.learnDescription}
            </p>

          </div>

          <div className="about-card">

            <div className="about-icon">

              {renderMedia(
                landingContent.competeIcon,
                "about-media"
              )}

            </div>

            <h3>
              {landingContent.competeTitle}
            </h3>

            <p>
              {landingContent.competeDescription}
            </p>

          </div>

          <div className="about-card">

            <div className="about-icon">

              {renderMedia(
                landingContent.masterIcon,
                "about-media"
              )}

            </div>

            <h3>
              {landingContent.masterTitle}
            </h3>

            <p>
              {landingContent.masterDescription}
            </p>

          </div>

        </div>

      </section>

      {/* ================= TRAINING ================= */}

      <section
        className="training"
        id="training"
      >

        <div className="section-heading">

          <p>LEVEL UP YOUR GAME</p>

          <h2>
            {landingContent.trainingTitle}
          </h2>

        </div>

        <div className="training-grid">

          <div className="training-card">

            <span>
              {renderMedia(
                landingContent.trainingIcon,
                "training-media"
              )}
            </span>

            <h3>
              Beginner Training
            </h3>

            <p>
              {landingContent.trainingInfo}
            </p>

          </div>

          <div className="training-card">

            <span>
              {renderMedia(
                landingContent.trainingIcon,
                "training-media"
              )}
            </span>

            <h3>
              Intermediate Training
            </h3>

            <p>
              Improve calculation, positional play,
              tactics and strategy.
            </p>

          </div>

          <div className="training-card">

            <span>
              {renderMedia(
                landingContent.trainingIcon,
                "training-media"
              )}
            </span>

            <h3>
              Advanced Training
            </h3>

            <p>
              Master advanced strategies, openings,
              endgames and competitive preparation.
            </p>

          </div>

        </div>

      </section>

      {/* ================= EVENTS ================= */}

      <section
        className="events"
        id="events"
      >

        <div className="section-heading">

          <p>
            PLAY • COMPETE • WIN
          </p>

          <h2>
            {landingContent.eventsTitle}
          </h2>

        </div>

        <div className="events-container">

          <div className="event">

            <div className="event-number">

              {renderMedia(
                landingContent.event1Icon,
                "event-media"
              )}

            </div>

            <div>

              <h3>
                {landingContent.event1Title}
              </h3>

              <p>
                {landingContent.event1Description}
              </p>

            </div>

          </div>

          <div className="event">

            <div className="event-number">

              {renderMedia(
                landingContent.event2Icon,
                "event-media"
              )}

            </div>

            <div>

              <h3>
                {landingContent.event2Title}
              </h3>

              <p>
                {landingContent.event2Description}
              </p>

            </div>

          </div>

          <div className="event">

            <div className="event-number">

              {renderMedia(
                landingContent.event3Icon,
                "event-media"
              )}

            </div>

            <div>

              <h3>
                {landingContent.event3Title}
              </h3>

              <p>
                {landingContent.event3Description}
              </p>

            </div>

          </div>

        </div>

      </section>

      
{/* ================= FREE CLASS ================= */}


<section className="free-class-section">

  <div className="free-class-content">

    <div className="free-class-label">
      ♟ &nbsp; FREE CHESS CLASS
    </div>

    <p className="free-class-eyebrow">
      READY TO MAKE YOUR MOVE?
    </p>

    <h2>
      {landingContent.freeClassTitle}
    </h2>

    <p className="free-class-description">
      {landingContent.freeClassInfo}
    </p>

    <div className="free-class-benefits">

      <div>
        <span>✓</span>
        <p>Beginner Friendly</p>
      </div>

      <div>
        <span>✓</span>
        <p>Expert Guidance</p>
      </div>

      <div>
        <span>✓</span>
        <p>100% Free First Class</p>
      </div>

    </div>

    <div className="free-class-login-box">
      <span>Already registered for a free class?</span>

      <Link to="/free-class-login">
        Free Class Login →
      </Link>
    </div>

  </div>


  <div className="free-class-booking-card">

    <div className="booking-card-header">
      <span className="booking-piece">♟</span>

      <div>
        <p>FREE CLASS</p>
        <h3>Book Your First Move</h3>
      </div>
    </div>

    <div className="booking-divider"></div>

    <form
      className="free-booking-form"
      onSubmit={handleFreeBookingSubmit}
    >

      <div className="booking-field">

        <label>Your Name</label>

        <input
          className="free-booking-input"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={freeBookingData.name}
          onChange={handleFreeBookingChange}
          required
        />

      </div>


      <div className="booking-field">

        <label>Email Address</label>

        <input
          className="free-booking-input"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={freeBookingData.email}
          onChange={handleFreeBookingChange}
          required
        />

      </div>


      <div className="booking-field">

        <label>Phone Number</label>

        <input
          className="free-booking-input"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={freeBookingData.phone}
          onChange={handleFreeBookingChange}
          required
        />

      </div>


      <div className="booking-field">

        <label>Preferred Class Time</label>

        <select
          className="free-booking-select"
          name="sectionTime"
          value={freeBookingData.sectionTime}
          onChange={handleFreeBookingChange}
          required
        >

          <option value="">
            Select Class Time
          </option>

          {(landingContent.freeClassTimes || "")
            .split("\n")
            .map((time) => time.trim())
            .filter(Boolean)
            .map((time, index) => (

              <option
                key={index}
                value={time}
              >
                {time}
              </option>

            ))}

        </select>

      </div>


      <button
        type="submit"
        className="free-booking-button"
        disabled={bookingLoading}
      >
        {bookingLoading
          ? "Booking Your Class..."
          : "Book My Free Class →"}
      </button>


      {bookingSuccess && (
        <p className="success-message">
          {bookingSuccess}
        </p>
      )}

      {bookingError && (
        <p className="error-message">
          {bookingError}
        </p>
      )}

    </form>

  </div>

</section>


      {/* ================= CONTACT ================= */}

      <section
        className="contact"
        id="contact"
      >

        <div className="section-heading">

          <p>GET IN TOUCH</p>

          <h2>
            Contact Us
          </h2>

        </div>

        <div className="contact-container">

          <div className="contact-info">

            <h3>
              Make Your Move
            </h3>

            <p>
              {landingContent.contactInfo}
            </p>

            <div className="contact-detail">

              <span>
                {renderMedia(
                  landingContent.heroIcon,
                  "contact-media"
                )}
              </span>

              <div>

                <h4>
                  Chess Club
                </h4>

                <p>
                  Learn • Play • Compete
                </p>

              </div>

            </div>

            <div className="contact-detail">

              <span>
                {renderMedia(
                  landingContent.emailIcon,
                  "contact-media"
                )}
              </span>

              <div>

                <h4>
                  Email
                </h4>

                <p>
                  chessclub@example.com
                </p>

              </div>

            </div>

            <div className="contact-detail">

              <span>
                {renderMedia(
                  landingContent.phoneIcon,
                  "contact-media"
                )}
              </span>

              <div>

                <h4>
                  Phone
                </h4>

                <p>
                  +91 98765 43210
                </p>

              </div>

            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-row">

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>

            <textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            />

            <button
              type="submit"
              className="contact-submit"
            >
              Send Message →
            </button>

            {successMessage && (
              <p className="success-message">
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <p className="error-message">
                {errorMessage}
              </p>
            )}

          </form>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-logo">

          {renderMedia(
            landingContent.heroIcon,
            "footer-media"
          )}

          <span>CHESS CLUB</span>

        </div>

        <p>
          Strategy. Discipline. Victory.
        </p>

        <div className="footer-links">

          <Link to="/login">
            Student Login
          </Link>

          <Link to="/register">
            Register
          </Link>

          <Link to="/admin-login">
            Admin Login
          </Link>

        </div>

        <div className="copyright">

          © 2026 Chess Club.
          All Rights Reserved.

        </div>

      </footer>

    </div>
  );
}

export default Home;

