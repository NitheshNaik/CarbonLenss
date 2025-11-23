# 🌱 CarbonLens

<div align="center">

![CarbonLens Banner](https://img.shields.io/badge/CarbonLens-Track%20%7C%20Reduce%20%7C%20Offset-10b981?style=for-the-badge)

**Empowering individuals to understand and reduce their carbon footprint, one purchase at a time.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4+-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-v8+-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Python](https://img.shields.io/badge/Python-v3.9+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)

[Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 🌍 Overview

**CarbonLens** is a platform dedicated to helping individuals understand and reduce their carbon footprint. Every day, our purchases—from groceries to gadgets—leave an invisible impact on the planet. Yet most people have no idea how their choices contribute to climate change.

Receipts, shopping apps, and e-commerce platforms give **zero visibility** into the environmental cost of what we buy. This lack of awareness keeps consumers powerless, driving lifestyle-based carbon emissions higher, and accelerating global warming, extreme weather, and ecosystem loss.

---

## ❌ The Problem

* **Invisible Impact**: Consumers have no way to know the carbon footprint of their daily purchases
* **Lack of Awareness**: Shopping receipts and apps provide no environmental data
* **Growing Emissions**: Lifestyle-based carbon emissions continue to rise unchecked
* **Climate Crisis**: Contributes to global warming, extreme weather, and ecosystem degradation
* **Consumer Powerlessness**: Without data, individuals cannot make informed sustainable choices

---

## ✅ Our Solution

**CarbonLens** empowers users with:

* 🔍 **AI-Powered Receipt Scanning**: Upload or scan receipts to instantly calculate carbon emissions
* 📊 **Intuitive Visualizations**: Break down emissions by product categories and daily activities
* 📈 **Trend Analysis**: Track daily, weekly, and monthly carbon footprint patterns
* 🏆 **Gamification**: Earn points, badges, and compete on leaderboards for sustainable actions
* 🤖 **AI Chatbot**: Get real-time guidance on reducing your carbon impact
* 🎁 **Rewards System**: Redeem GreenPoints for eco-friendly coupons and incentives

---

## ✨ Key Features

### 📸 Receipt Scanning & Analysis

* Upload receipts via image or camera
* AI-powered OCR extracts product information
* Instant CO₂ emission calculations per item
* Category-based carbon breakdown

### 📊 Dashboard & Analytics

* **Yearly Heatmap**: GitHub-style activity visualization of your carbon tracking
* **Impact Meter**: Real-time assessment of your environmental footprint
* **Category Breakdown**: Doughnut charts showing emissions by product type
* **My Trends**: Month-over-month comparison and progress tracking

### 🎮 Gamification System

* **Badges**: Earn achievements for milestones (First Step, Weekly Tracker, Eco Champion)
* **Leaderboards**: Compete with friends and the community
* **GreenPoints**: Accumulate points for every tracked activity
* **Rewards**: Redeem points for sustainable product discounts and eco-friendly incentives

### 🤖 AI-Powered Assistance

* Real-time chatbot for carbon footprint queries
* Personalized recommendations for reducing emissions
* Educational content on sustainable practices
* Daily usage tracking for gas, electricity, and more

### 📈 Insights & Recommendations

* Identify your biggest carbon contributors
* Compare your impact to community averages
* Receive actionable steps to reduce emissions
* Equivalent comparisons (km driven, trees needed, LED hours)

---

## 🛠️ Tech Stack

### **Frontend**

* **EJS** (Embedded JavaScript Templates) - Server-side rendering
* **Vanilla JavaScript** - Interactive UI components
* **Chart.js** - Data visualization (doughnut charts, trends)
* **CSS3** - Modern glassmorphism design with animations

### **Backend**

* **Node.js** (v18+) - JavaScript runtime
* **Express.js** (v4+) - Web application framework
* **Python** (v3.9+) - AI/ML processing and OCR
  * **Tesseract OCR** - Receipt text extraction
  * **OpenCV** - Image preprocessing
  * **Pandas** - Data processing
  * **scikit-learn** - Carbon emission calculations

### **Database**

* **MySQL** (v8+) - Relational database for structured data
  * User management and authentication
  * Receipt and transaction history
  * Gamification data (badges, leaderboards, points)
  * Carbon footprint records

### **AI & Machine Learning**

* **Computer Vision** - Receipt scanning and product recognition
* **NLP** - Chatbot query processing
* **Carbon Calculation API** - Product-to-emissions mapping


### **Additional Tools**

* **bcrypt** - Password hashing
* **express-session** - Session management
* **dotenv** - Environment configuration
* **nodemon** - Development hot-reload

---

## 📁 Project Structure

```
CarbonLens/
│
├── backend/                  # Node.js + Express server
│   ├── app.js                # Main Express app
│   ├── routes/               # Express routes
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── receipts.js
│   │   ├── leaderboard.js
│   │   └── admin.js
│   ├── controllers/          # Route handlers
│   ├── models/               # Sequelize or MySQL table models
│   ├── middleware/           # Auth, validation, rate-limiting
│   ├── utils/                # Helper functions
│   └── views/                # EJS templates
│       ├── partials/         # Header, footer, navbar
│       ├── landing.ejs
│       ├── dashboard.ejs
│       ├── upload_receipt.ejs
│       └── ...
│
├── microservice/             # Python AI/ML microservice
│   ├── app.py                # FastAPI entrypoint
│   ├── models/               # ML models for OCR, carbon estimation
│   ├── utils/                # Parsing, preprocessing
│   └── requirements.txt
│
├── public/                   # Static assets
│   ├── css/
│   │   └── landing.css
│   ├── js/
│   │   └── landing.js
│   └── images/
│
├── database/
│   ├── schema.sql            # MySQL tables & initial data
│   └── seed.sql              # Sample demo products / users
│
├── package.json              # Node dependencies
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** v18+ ([Download](https://nodejs.org/))
* **Python** v3.9+ ([Download](https://www.python.org/))
* **MySQL** v8+ ([Download](https://dev.mysql.com/downloads/))

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/NitheshNaik/CarbonLens.git
cd carbonlens
```

#### 2. Install Node.js dependencies

```bash
npm install
```

#### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

#### 4. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

**Example `.env`:**

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=carbonlens

# Session
SESSION_SECRET=your_secret_key

# Python API
PYTHON_API_URL=http://localhost:5000

# AWS (for deployment)
AWS_REGION=us-east-1
AWS_ECR_REPO=your-ecr-repo-url
```

#### 5. Set up MySQL database

```bash
mysql -u root -p < database/schema.sql
```

#### 6. Start the Python OCR/ML service

```bash
cd python-service
python app.py
# Runs on http://localhost:5000
```

#### 7. Start the Node.js application

```bash
npm start
# Or for development:
npm run dev
# Runs on http://localhost:3000
```

#### 8. Access the application

```
Open http://localhost:3000 in your browser
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

* Follow existing code style and conventions
* Write meaningful commit messages
* Add tests for new features
* Update documentation as needed
* Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**CarbonLens Team**

* 📧 Email: nitheshbnaik@gmail.com
* 💼 LinkedIn: [Nithesh Naik](https://www.linkedin.com/in/nithesh-naik-a75621291/)

**Project Link:** [https://github.com/NitheshNaik/CarbonLens](https://github.com/NitheshNaik/CarbonLens)

---

## 🌟 Acknowledgments

* Carbon emission data sourced from [Carbon Footprint Database](#)
* Receipt OCR powered by Tesseract
* Special thanks to all contributors : [Nishant Kumar](https://github.com/Nishant9764), [Pranay B](https://github.com/Pra-nay-B), [Rupesh Raj](https://github.com/rupeshraj95), [Naveen R](https://github.com/NAVEEN-R-SN), [Purushottam Kumar](https://github.com/purusho1)

---

<div align="center">

**Made with 💚 for a sustainable future**

*CarbonLens - Track. Reduce. Offset.*

</div>
