import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setLoading(false);
        return;
      }

      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        setError("No user session found. Please log in.");
        setLoading(false);
        return;
      }

      let attempts = 0;
      const maxAttempts = 5; // Retry up to 5 times
      const delay = 2000; // 2 seconds between retries

      while (attempts < maxAttempts) {
        try {
          const response = await axios.get(
            `http://localhost:5000/profile/${userEmail}`
          );

          if (response.data) {
            login(response.data); // Store user data in context
            setError(null);
            break;
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setError("Failed to load profile data.");
        }

        // Wait before next attempt
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempts++;
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [user, login]);

  if (loading) {
    return <div>Loading your profile...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>No profile data found.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Your email is: {user.email}</p>
    </div>
  );
};

export default Dashboard;
