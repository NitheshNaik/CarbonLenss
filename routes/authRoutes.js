// routes/auth.js

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Fixed CO2 emission per unit (average values)
const co2Values = {
  electricity: 0.85, // kg CO2 per kWh
  gas: 2.2, // kg CO2 per m³
  petrol: 2.3, // kg CO2 per liter
  diesel: 2.7, // kg CO2 per liter
  motorcycle: 0.1, // kg CO2 per km
  car: 0.2, // kg CO2 per km
  bus: 0.05, // kg CO2 per km
  train: 0.04, // kg CO2 per km
  water: 0.0004, // kg CO2 per liter
};

// ----------------------
// Landing page
router.get("/", (req, res) => {
  res.render("landing");
});

// Login / Signup Page
router.get("/auth", (req, res) => {
  const tab = req.query.tab || "login"; // default to login tab
  res.render("auth", { tab });
});

// Signup POST
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res.send("Email already registered. Try login!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const userId = result.insertId;

    // Assign default Bronze badge
    await db.query("INSERT INTO badges (user_id, badge_name) VALUES (?, ?)", [
      userId,
      "Bronze",
    ]);

    res.send("Signup successful! Bronze badge awarded. You can now login.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during signup");
  }
});

// Login POST
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.send("No user found with this email.");
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Incorrect password!");
    }
    req.session.userId = user.id; // store user id in session
    req.session.userName = user.name; // optional: store username

    const [badges] = await db.query(
      "SELECT badge_name FROM badges WHERE user_id = ?",
      [user.id]
    );

    const recommendations = [
      "Try plant-based meals 3x a week",
      "Reduce dairy consumption by 10%",
      "Buy second-hand clothes",
      "Use local produce",
    ];

    const dashboardUser = {
      id: user.id,
      name: user.name,
      greenPoints: 1245, // sample value
      rank: 23, // sample value
      impactLevel: "Medium",
    };

    // Render dashboard
    res.render("dashboard", {
      user: dashboardUser,
      badges,
      recommendations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during login");
  }
});

router.get("/edit-items", (req, res) => {
  res.render("edit-items"); // EJS page with form
});

// ----------------------
// Daily CO2 Input Form Route
// Daily CO2 Form Submission (store total CO2 in DB)
router.post("/save-daily-co2", async (req, res) => {
  try {
    const userId = req.session.userId; // get logged-in user ID
    if (!userId) return res.redirect("/auth?tab=login"); // redirect if not logged in

    const inputs = req.body;
    let totalCO2 = 0;
    const breakdown = []; // <-- define breakdown

    // Calculate total CO2 and create breakdown
    for (const [key, value] of Object.entries(inputs)) {
      const qty = parseFloat(value) || 0;
      const co2PerUnit = co2Values[key] || 0;
      const itemCO2 = qty * co2PerUnit;

      breakdown.push({
        item: key,
        quantity: qty,
        co2_per_unit: co2PerUnit,
        total_co2: itemCO2,
      });

      totalCO2 += itemCO2;
    }

    // Insert total CO2 and user_id into daily_co2_entries
    await db.query(
      "INSERT INTO daily_co2_entries (user_id, total_co2) VALUES (?, ?)",
      [userId, totalCO2]
    );

    // Render result page
    res.render("daily-co2-result", { breakdown, totalCO2 });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving CO₂ data");
  }
});

router.get("/brkdwn", (req, res) => {
  res.render("brkdwn"); // EJS page with form
});


// GET /trends
router.get("/trends", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/auth?tab=login");

    // Daily data for last 7 days
    const [dailyData] = await db.query(
      `SELECT entry_date, total_co2 
       FROM daily_co2_entries 
       WHERE user_id = ? 
       ORDER BY entry_date DESC 
       LIMIT 7`,
      [userId]
    );

    // Weekly aggregation (last 4 weeks)
    const [weeklyData] = await db.query(
      `SELECT WEEK(entry_date) as week_num, SUM(total_co2) as total_co2
       FROM daily_co2_entries 
       WHERE user_id = ? 
       GROUP BY week_num
       ORDER BY week_num DESC 
       LIMIT 4`,
      [userId]
    );

    // Monthly aggregation (last 6 months)
    const [monthlyData] = await db.query(
      `SELECT MONTH(entry_date) as month_num, SUM(total_co2) as total_co2
       FROM daily_co2_entries 
       WHERE user_id = ? 
       GROUP BY month_num
       ORDER BY month_num DESC 
       LIMIT 6`,
      [userId]
    );

    res.render("trends", { dailyData, weeklyData, monthlyData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching CO2 trends");
  }
});

module.exports = router;
