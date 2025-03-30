require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", applicationRoutes);
app.use("/api", contactRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

