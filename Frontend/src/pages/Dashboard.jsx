import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Assume you have an AuthContext

const Dashboard = () => {
  const { user, login } = useAuth(); // Get user from context and the login function

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Check if user data is already in the context
      if (user) {
        setLoading(false);
        return;
      }

      // If not, try to get the email from a persistent storage (e.g., localStorage)
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        setError("No user session found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/profile/${userEmail}`
        );
        // Use the login function to set the user data in the context
        login(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, login]); // Re-run if user or login function changes

  if (loading) {
    return <div>Loading your profile...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    // This case should be rare if logic is correct, but a fallback
    return <div>No profile data found.</div>;
  }

  // Render the dashboard with the fetched data
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Your email is: {user.email}</p>
      {/* Display other profile information here */}
    </div>
  );
};

export default Dashboard;
