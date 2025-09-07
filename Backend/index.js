const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const dbName = "CollabGrowDB";
console.log(`Attempting to connect to MongoDB cluster with URI: ${uri}`);
console.log(`Targeting database: ${dbName}`);

let db;

// Connect to MongoDB once and start the server after a successful connection
MongoClient.connect(uri)
  .then((client) => {
    console.log("Connected to MongoDB cluster successfully.");
    db = client.db(dbName);
    console.log(`Successfully selected database: ${dbName}`);

    // All routes that interact with the database must be inside this block

    // POST route to insert form data
    app.post("/submit", async (req, res) => {
      try {
        const data = req.body;
        // FIX: Ensure email is stored in lowercase to prevent case-sensitivity issues
        if (data.email) {
          data.email = data.email.toLowerCase();
        }
        const result = await db.collection("profile").insertOne(data);
        res.json({ success: true, id: result.insertedId });
      } catch (err) {
        console.error("Insert Error:", err);
        res.status(500).json({ success: false, message: "Database Error" });
      }
    });

    // Get all posts
    app.get("/api/posts", async (req, res) => {
      try {
        const data = await db.collection("posts").find({}).toArray();
        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Can't fetch data" });
      }
    });

    // Post a new post
    app.post("/api/posts", async (req, res) => {
      console.log("POST request received at /api/posts");
      try {
        const data = req.body;
        console.log("Received data:", data);

        if (!data) {
          return res
            .status(400)
            .json({ success: false, message: "No data received" });
        }

        const result = await db.collection("posts").insertOne(data);
        res.json({ success: true, id: result.insertedId });
      } catch (err) {
        console.error("Insert Error:", err);
        res.status(500).json({ success: false, message: "Database Error" });
      }
    });

    // CORRECTED: The GET endpoint to fetch a profile is now in the correct location.
    app.get("/profile/:email", async (req, res) => {
      console.log(`GET request for profile received for: ${req.params.email}`);
      try {
        // FIX: Ensure the email is in lowercase before searching
        const userEmail = req.params.email.toLowerCase();
        const userProfile = await db
          .collection("profile")
          .findOne({ email: userEmail });

        if (!userProfile) {
          console.log(`Profile not found for email: ${userEmail}`);
          return res.status(404).json({ message: "Profile not found." });
        }
        console.log(`Profile found for email: ${userEmail}`);
        res.status(200).json(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Server error." });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// A simple get route to check if the server is up
app.get("/", (req, res) => {
  res.send("Hello from the server! Database is connecting...");
});
