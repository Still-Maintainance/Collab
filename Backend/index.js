
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const authenticateFirebaseToken = require("./firebaseAuth");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Log the URI and DB name for debugging
const uri = process.env.MONGO_URI;
const dbName = "CollabGrowDB" ;
console.log(`Attempting to connect to MongoDB cluster with URI: ${uri}`); 
console.log(`Targeting database: ${dbName}`);

let db;

// Connect to MongoDB once and start the server after a successful connection
MongoClient.connect(uri)
  .then((client) => {
    console.log("Connected to MongoDB cluster successfully.");
    db = client.db(dbName);
    console.log(`Successfully selected database: ${dbName}`);


    // POST route to insert form data - This will now only be active after the DB connection is ready
    app.post("/submit", async (req, res) => {
      try {
        const data = req.body;
        const result = await db.collection("profile").insertOne(data);
        res.json({ success: true, id: result.insertedId });
      } catch (err) {
        console.error("Insert Error:", err);
        // Log the specific error object for more detail
        res.status(500).json({ success: false, message: "Database Error" });
      }
    });

    // /me endpoint: Get current user's profile from MongoDB using Firebase UID
    app.get("/me", authenticateFirebaseToken, async (req, res) => {
      try {
        // Assuming user profiles are stored in the 'users' collection and have a 'firebaseUid' field
        const user = await db.collection("users").findOne({ firebaseUid: req.firebaseUid });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
      } catch (err) {
        console.error("/me endpoint error:", err);
        res.status(500).json({ error: "Database error" });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    // Exit the process if the database connection fails
    process.exit(1);
  });

// A simple get route to check if the server is up
app.get("/", (req, res) => {
  res.send("Hello from the server! Database is connecting...");
});
