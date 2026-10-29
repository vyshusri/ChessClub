import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPageManagement.css";

// IMPORTANT: Keep these components OUTSIDE LandingPageManagement.
// Defining them inside the parent recreates their component type on every
// keystroke, which makes the input lose focus after one character.

const MediaPreview = ({ value, large = false }) => {
  if (!value) {
    return (
      <div className={large ? "media-preview large" : "media-preview"}>
        <span>♟</span>
      </div>
    );
  }

  // Treat both absolute image URLs and backend upload paths as images.
  const isImage =
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:image/") ||
    value.startsWith("/uploads/");

  // Uploaded files returned as /uploads/... must be loaded from the
  // Spring Boot server, not from the React/Vite server.
  const imageSrc = value.startsWith("/uploads/")
    ? `http://localhost:8081${value}`
    : value;

  if (isImage) {
    return (
      <img
        src={imageSrc}
        alt="Landing page media"
        className={large ? "media-preview-image large" : "media-preview-image"}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return (
    <div className={large ? "media-preview large" : "media-preview"}>
      <span>{value}</span>
    </div>
  );
};

const MediaSelector = ({
  name,
  label,
  content,
  symbols,
  onMediaChange,
  onFileUpload,
  uploading,
}) => {
  const currentValue = content[name] || "";
  const isSymbol = symbols.includes(currentValue);

  return (
    <div className="media-editor">
      <div className="media-editor-title">
        <span>{label}</span>
      </div>

      <div className="media-preview-row">
        <MediaPreview value={currentValue} />

        <div className="media-current">
          <span className="current-label">CURRENT MEDIA</span>
          <span className="current-value">
            {currentValue || "No media selected"}
          </span>
        </div>
      </div>

      <div className="media-options">
        <div className="media-option">
          <label>Choose Symbol</label>
          <select
            value={isSymbol ? currentValue : ""}
            onChange={(e) => onMediaChange(name, e.target.value)}
          >
            <option value="">Select a symbol</option>
            {symbols.map((symbol, index) => (
              <option key={index} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>

        <div className="media-option">
          <label>Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/image.png"
            value={!isSymbol ? currentValue : ""}
            onChange={(e) => onMediaChange(name, e.target.value)}
          />
        </div>
      </div>

      <div className="upload-area">
        <label className="upload-button">
          <span>＋</span>
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileUpload(e, name)}
            disabled={uploading}
          />
        </label>
        <small>PNG, JPG, JPEG or WEBP</small>
      </div>
    </div>
  );
};

const TextInput = ({
  name,
  label,
  placeholder,
  content,
  onChange,
}) => (
  <div className="field">
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={content[name] || ""}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

const TextArea = ({
  name,
  label,
  placeholder,
  rows = 4,
  content,
  onChange,
}) => (
  <div className="field">
    <label>{label}</label>
    <textarea
      name={name}
      value={content[name] || ""}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required
    />
  </div>
);

function LandingPageManagement() {
  const navigate = useNavigate();

  // =========================================================
  // DEFAULT CONTENT
  // =========================================================

  const defaultContent = {
    heroTitle: "Your Move. Your Victory.",
    heroDescription: "Where strategy meets passion.",
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

    freeClassTitle: "Your Chess Journey Starts Here.",
    freeClassInfo: "Book your free chess class today.",
    freeClassIcon: "♟",

    freeClassTimes:
  "10:00 AM - 11:00 AM\n" +
  "2:00 PM - 3:00 PM\n" +
  "5:00 PM - 6:00 PM\n" +
  "7:00 PM - 8:00 PM",
    eventsTitle: "Club Events",

    event1Title: "Monthly Chess Tournament",
    event1Description:
      "Test your skills against fellow club members.",
    event1Icon: "♟",

    event2Title: "Rapid Chess Championship",
    event2Description:
      "Fast decisions. Sharp tactics. Maximum excitement.",
    event2Icon: "♞",

    event3Title: "Chess Workshop",
    event3Description:
      "Learn advanced techniques from experienced players.",
    event3Icon: "♛",

    contactInfo:
      "Have a question about our chess club? We'd love to hear from you.",
    emailIcon: "✉",
    phoneIcon: "☎",
  };

  // =========================================================
  // STATES
  // =========================================================

  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // =========================================================
  // SYMBOLS
  // =========================================================

  const symbols = [
    "♟",
    "♞",
    "♝",
    "♜",
    "♛",
    "♚",
    "♔",
    "♕",
    "♖",
    "♗",
    "♘",
    "♙",
    "★",
    "✦",
    "◆",
    "◇",
    "●",
    "○",
    "✧",
    "✪",
    "✉",
    "☎",
  ];

  // =========================================================
  // LOAD LANDING PAGE CONTENT
  // =========================================================

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/landing-page"
        );

        if (!response.ok) {
          throw new Error("Failed to load content");
        }

        const data = await response.json();

        setContent({
          ...defaultContent,
          ...data,
        });
      } catch (error) {
        console.error("Landing page error:", error);

        setMessage(
          "Unable to load Landing Page content."
        );
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // =========================================================
  // TEXT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContent((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // MEDIA CHANGE
  // =========================================================

  const handleMediaChange = (name, value) => {
    setContent((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      setMessageType("error");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage(
        "Admin session expired. Please login again."
      );
      setMessageType("error");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://localhost:8081/api/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          responseText || "Image upload failed."
        );
      }

      // The upload API may return either plain text or a JSON string/object.
      // Normalize it to the actual image URL before storing it in state.
      let imageUrl = responseText.trim();

      try {
        const parsed = JSON.parse(imageUrl);

        if (typeof parsed === "string") {
          imageUrl = parsed.trim();
        } else if (parsed?.url) {
          imageUrl = String(parsed.url).trim();
        } else if (parsed?.path) {
          imageUrl = String(parsed.path).trim();
        }
      } catch {
        // Plain-text URL/path returned by the backend.
      }

      // Convert a Spring Boot relative upload path to an absolute URL so the
      // same saved value also works on the React public landing page.
      if (imageUrl.startsWith("/uploads/")) {
        imageUrl = `http://localhost:8081${imageUrl}`;
      }

      if (!imageUrl) {
        throw new Error("The upload server did not return an image URL.");
      }

      handleMediaChange(fieldName, imageUrl);

      setMessage(
        "Image uploaded successfully. Click Save Changes to apply it."
      );
      setMessageType("success");
    } catch (error) {
      console.error("Upload error:", error);

      setMessage("Unable to upload image.");
      setMessageType("error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // =========================================================
  // SAVE CONTENT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage(
        "Admin session expired. Please login again."
      );
      setMessageType("error");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/landing-page",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(content),
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!response.ok) {
        setMessage(
          typeof data === "string"
            ? data
            : "Failed to update Landing Page."
        );

        setMessageType("error");
        return;
      }

      setContent({
        ...content,
        ...(typeof data === "object" ? data : {}),
      });

      setMessage(
        "Landing Page updated successfully!"
      );
      setMessageType("success");
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to the server."
      );
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="landing-loading">
        <div className="loading-piece">
          ♛
        </div>

        <h2>
          Loading Landing Page...
        </h2>

        <p>
          Preparing your chess club editor
        </p>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="landing-management">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="management-header">

        <div className="brand">

          <div className="brand-piece">
            ♛
          </div>

          <div>
            <h2>CHESS CLUB</h2>

            <span>
              ADMINISTRATION
            </span>
          </div>

        </div>

        <div className="header-right">

          <div className="admin-info">
            <span className="admin-dot"></span>

            <div>
              <strong>Administrator</strong>
              <small>Admin Panel</small>
            </div>
          </div>

          <button
            className="dashboard-button"
            type="button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            ← Dashboard
          </button>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="management-main">

        <div className="page-heading">

          <div>

            <span className="eyebrow">
              WEBSITE CONTROL CENTER
            </span>

            <h1>
              Landing Page Management
            </h1>

            <p>
              Manage the content, symbols and
              images displayed on your public
              Chess Club website.
            </p>

          </div>

          <div className="heading-piece">
            ♞
          </div>

        </div>

        {/* ===================================================
            MESSAGE
        =================================================== */}

        {message && (
          <div
            className={`management-message ${messageType}`}
          >
            <span>
              {messageType === "success"
                ? "✓"
                : "!"}
            </span>

            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              HERO SECTION
          ================================================= */}

          <section className="management-card hero-card">

            <div className="card-header">

              <div className="section-icon">
                ♟
              </div>

              <div>
                <h2>Hero Section</h2>

                <p>
                  Main content visitors see first
                </p>
              </div>

              <span className="section-number">
                01
              </span>

            </div>

            <div className="hero-editor-grid">

              <div>

                <TextInput
                  content={content}
                  onChange={handleChange}
                  name="heroTitle"
                  label="Hero Title"
                  placeholder="Enter Hero Title"
                />

                <TextArea
                  content={content}
                  onChange={handleChange}
                  name="heroDescription"
                  label="Hero Description"
                  placeholder="Enter Hero Description"
                  rows={5}
                />

              </div>

              <div className="hero-media-area">

                <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                  name="heroIcon"
                  label="Hero Icon / Image"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              ABOUT SECTION
          ================================================= */}

          <div className="section-title-row">

            <div>
              <span>02</span>
              <h2>About Section</h2>
            </div>

            <p>
              Tell visitors what makes your
              chess club special.
            </p>

          </div>

          <div className="two-column-grid">

            {/* LEARN */}

            <section className="management-card">

              <div className="small-card-header">

                <div className="section-icon">
                  ♟
                </div>

                <div>
                  <h3>Learn</h3>
                  <span>
                    Build stronger fundamentals
                  </span>
                </div>

              </div>

              <TextInput
                  content={content}
                  onChange={handleChange}
                name="learnTitle"
                label="Title"
                placeholder="Enter Learn Title"
              />

              <TextArea
                  content={content}
                  onChange={handleChange}
                name="learnDescription"
                label="Description"
                placeholder="Enter Learn Description"
              />

              <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                name="learnIcon"
                label="Learn Icon / Image"
              />

            </section>

            {/* COMPETE */}

            <section className="management-card">

              <div className="small-card-header">

                <div className="section-icon">
                  ♞
                </div>

                <div>
                  <h3>Compete</h3>
                  <span>
                    Play and challenge others
                  </span>
                </div>

              </div>

              <TextInput
                  content={content}
                  onChange={handleChange}
                name="competeTitle"
                label="Title"
                placeholder="Enter Compete Title"
              />

              <TextArea
                  content={content}
                  onChange={handleChange}
                name="competeDescription"
                label="Description"
                placeholder="Enter Compete Description"
              />

              <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                name="competeIcon"
                label="Compete Icon / Image"
              />

            </section>

          </div>

          {/* MASTER */}

          <section className="management-card master-card">

            <div className="small-card-header">

              <div className="section-icon">
                ♛
              </div>

              <div>
                <h3>Master</h3>

                <span>
                  Take your game to the next level
                </span>
              </div>

            </div>

            <div className="master-grid">

              <TextInput
                  content={content}
                  onChange={handleChange}
                name="masterTitle"
                label="Title"
                placeholder="Enter Master Title"
              />

              <TextArea
                  content={content}
                  onChange={handleChange}
                name="masterDescription"
                label="Description"
                placeholder="Enter Master Description"
                rows={3}
              />

            </div>

            <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
              name="masterIcon"
              label="Master Icon / Image"
            />

          </section>

          {/* =================================================
              TRAINING
          ================================================= */}

          <div className="section-title-row">

            <div>
              <span>03</span>
              <h2>Training Section</h2>
            </div>

            <p>
              Customize your training information.
            </p>

          </div>

          <section className="management-card">

            <div className="training-grid">

              <div>

                <TextInput
                  content={content}
                  onChange={handleChange}
                  name="trainingTitle"
                  label="Training Title"
                  placeholder="Enter Training Title"
                />

                <TextArea
                  content={content}
                  onChange={handleChange}
                  name="trainingInfo"
                  label="Training Information"
                  placeholder="Enter Training Information"
                  rows={5}
                />

              </div>

              <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                name="trainingIcon"
                label="Training Icon / Image"
              />

            </div>

          </section>

          {/* =================================================
              FREE CLASS
          ================================================= */}

          <section className="management-card">

            <div className="card-header">

              <div className="section-icon">
                ♙
              </div>

              <div>
                <h2>Free Class Section</h2>

                <p>
                  Encourage visitors to begin
                  their chess journey.
                </p>
              </div>

              <span className="section-number">
                04
              </span>

            </div>

            <div className="training-grid">

              <div>

                <TextInput
                  content={content}
                  onChange={handleChange}
                  name="freeClassTitle"
                  label="Free Class Title"
                  placeholder="Enter Free Class Title"
                />

                <TextArea
                  content={content}
                  onChange={handleChange}
                  name="freeClassInfo"
                  label="Free Class Information"
                  placeholder="Enter Free Class Information"
                  rows={4}
                />

                <TextArea
  content={content}
  onChange={handleChange}
  name="freeClassTimes"
  label="Available Class Times"
  placeholder={"Enter one class time per line"}
  rows={6}
/>ss

              </div>

              <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                name="freeClassIcon"
                label="Free Class Icon / Image"
              />

            </div>

          </section>

          {/* =================================================
              EVENTS
          ================================================= */}

          <div className="section-title-row">

            <div>
              <span>05</span>
              <h2>Events Section</h2>
            </div>

            <p>
              Manage tournaments, workshops
              and club events.
            </p>

          </div>

          <section className="management-card">

            <TextInput
                  content={content}
                  onChange={handleChange}
              name="eventsTitle"
              label="Events Section Title"
              placeholder="Enter Events Title"
            />

            <div className="event-grid">

              <div className="event-editor">

                <div className="event-heading">
                  <span>♟</span>
                  <strong>Event 01</strong>
                </div>

                <TextInput
                  content={content}
                  onChange={handleChange}
                  name="event1Title"
                  label="Title"
                  placeholder="Enter Event Title"
                />

                <TextArea
                  content={content}
                  onChange={handleChange}
                  name="event1Description"
                  label="Description"
                  placeholder="Enter Event Description"
                  rows={3}
                />

                <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                  name="event1Icon"
                  label="Event Icon / Image"
                />

              </div>

              <div className="event-editor">

                <div className="event-heading">
                  <span>♞</span>
                  <strong>Event 02</strong>
                </div>

                <TextInput
                  content={content}
                  onChange={handleChange}
                  name="event2Title"
                  label="Title"
                  placeholder="Enter Event Title"
                />

                <TextArea
                  content={content}
                  onChange={handleChange}
                  name="event2Description"
                  label="Description"
                  placeholder="Enter Event Description"
                  rows={3}
                />

                <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                  name="event2Icon"
                  label="Event Icon / Image"
                />

              </div>

              <div className="event-editor">

                <div className="event-heading">
                  <span>♛</span>
                  <strong>Event 03</strong>
                </div>

                <TextInput
                  content={content}
                  onChange={handleChange}
                  name="event3Title"
                  label="Title"
                  placeholder="Enter Event Title"
                />

                <TextArea
                  content={content}
                  onChange={handleChange}
                  name="event3Description"
                  label="Description"
                  placeholder="Enter Event Description"
                  rows={3}
                />

                <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                  name="event3Icon"
                  label="Event Icon / Image"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="section-title-row">

            <div>
              <span>06</span>
              <h2>Contact Section</h2>
            </div>

            <p>
              Manage your contact information.
            </p>

          </div>

          <section className="management-card">

            <TextArea
                  content={content}
                  onChange={handleChange}
              name="contactInfo"
              label="Contact Information"
              placeholder="Enter Contact Information"
              rows={4}
            />

            <div className="contact-media-grid">

              <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                name="emailIcon"
                label="Email Icon / Image"
              />

              <MediaSelector
                  content={content}
                  symbols={symbols}
                  onMediaChange={handleMediaChange}
                  onFileUpload={handleFileUpload}
                  uploading={uploading}
                name="phoneIcon"
                label="Phone Icon / Image"
              />

            </div>

          </section>

          {/* =================================================
              SAVE AREA
          ================================================= */}

          <div className="save-area">

            <div>

              <span className="save-piece">
                ♚
              </span>

              <div>
                <strong>
                  Ready to publish?
                </strong>

                <p>
                  Save your changes to update
                  the public landing page.
                </p>
              </div>

            </div>

            <div className="save-buttons">

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  navigate("/admin-dashboard")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-button"
                disabled={
                  saving || uploading
                }
              >
                {saving
                  ? "Saving..."
                  : "✓ Save Changes"}
              </button>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
}

export default LandingPageManagement;