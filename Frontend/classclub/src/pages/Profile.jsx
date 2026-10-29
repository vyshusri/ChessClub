import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  
     
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetch("http://localhost:8081/api/users/profile", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      return response.json();
    })
    .then((data) => {
      console.log("PROFILE:", data);
      setUser(data);
    })
    .catch((error) => {
      console.error("PROFILE ERROR:", error);
      setMessage("Failed to fetch profile");
    });
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (message) {
    return (
      <div>
        <h2>{message}</h2>

        <button onClick={() => navigate("/login")}>
          Login Again
        </button>
      </div>
    );
  }

  if (!user) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div>
      <h1>♟ Chess Club</h1>

      <h2>My Profile</h2>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;