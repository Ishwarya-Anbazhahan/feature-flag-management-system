const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const superAdminRoutes = require("./routes/superAdminRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const userRoutes = require("./routes/userRoutes");
const featureFlagRoutes = require("./routes/featureFlagRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/super-admin", superAdminRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feature-flags", featureFlagRoutes);


app.get("/", (req, res) => {
    res.send("Feature Flag Management System API Running...");
});


const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});