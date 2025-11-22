const express = require("express");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const multer = require("multer"); // <-- Add this
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data"); // <-- Needed for sending file to Python

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --------------------
// Session setup
app.use(
  session({
    secret: "your_strong_secret_here",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// --------------------
// Multer setup for receipt uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }); // <-- This defines `upload`

// --------------------
// Routes
app.use("/", authRoutes);

// Upload route that sends file to Python API
app.post("/upload-receipt", upload.single("receipt"), async (req, res) => {
  if (!req.file) return res.send("No file uploaded.");

  try {
    const formData = new FormData();
    formData.append("receipt", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://localhost:5002/process-receipt",
      formData,
      { headers: formData.getHeaders() }
    );

    const data = response.data; // { items: [...], total_co2: ... }

    // Render receipt-details page with processed data
    res.render("receipt-details", { file: req.file.filename, data });
  } catch (err) {
    console.error(err);
    res.send("Error processing receipt.");
  }
});

// --------------------
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
