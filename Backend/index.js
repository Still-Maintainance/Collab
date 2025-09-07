const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer"); // ✅ 1. Import nodemailer
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const dbName = "CollabGrowDB";
console.log(`Attempting to connect to MongoDB cluster with URI: ${uri}`);
console.log(`Targeting database: ${dbName}`);

let db;

// ✅ 2. Configure Nodemailer Transporter
// This uses the credentials from your .env file to send emails.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Connect to MongoDB once and start the server after a successful connection
MongoClient.connect(uri)
  .then((client) => {
    console.log("Connected to MongoDB cluster successfully.");
    db = client.db(dbName);
    console.log(`Successfully selected database: ${dbName}`);

    // All routes that interact with the database must be inside this block

    // POST route to insert profile form data
    app.post("/submit", async (req, res) => {
      try {
        const data = req.body;
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

    // Get all project posts
    app.get("/api/posts", async (req, res) => {
      try {
        const data = await db
          .collection("posts")
          .find({})
          .sort({ createdAt: -1 })
          .toArray(); // Sort by most recent
        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Can't fetch data" });
      }
    });

    // Post a new project
    app.post("/api/posts", async (req, res) => {
      try {
        const data = req.body;
        if (!data) {
          return res
            .status(400)
            .json({ success: false, message: "No data received" });
        }
        const result = await db.collection("posts").insertOne(data);
        res.status(201).json({ success: true, id: result.insertedId }); // Use 201 for resource creation
      } catch (err) {
        console.error("Insert Error:", err);
        res.status(500).json({ success: false, message: "Database Error" });
      }
    });

    // GET a profile by email
    app.get("/profile/:email", async (req, res) => {
      try {
        const userEmail = req.params.email.toLowerCase();
        const userProfile = await db
          .collection("profile")
          .findOne({ email: userEmail });

        if (!userProfile) {
          return res.status(404).json({ message: "Profile not found." });
        }
        res.status(200).json(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Server error." });
      }
    });

    // ✅ 3. NEW ROUTE: Handle sending emails for join requests
    // in index.js

    app.post("/api/join-request", async (req, res) => {
      // ✅ ADD THIS LOG to see if the request is reaching the backend
      console.log("Join request received with body:", req.body);

      const { projectTitle, authorEmail, joinerName, joinerEmail } = req.body;

      const mailOptions = {
        from: `"CollabGrow" <${process.env.EMAIL_USER}>`,
        to: authorEmail,
        subject: `New Collaboration Request for "${projectTitle}"`,
        html: `... your html ...`, // your email HTML is fine
      };

      try {
        console.log("Attempting to send email..."); // ✅ Log before sending
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!"); // ✅ Log on success
        res.status(200).json({ message: "Request sent successfully!" });
      } catch (error) {
        // ✅ THIS IS THE MOST IMPORTANT LOG
        // It will print the exact error from nodemailer
        console.error("!!! Nodemailer Error:", error);
        res.status(500).json({ message: "Failed to send join request." });
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
