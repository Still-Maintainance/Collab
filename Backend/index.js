const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
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
