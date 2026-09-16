const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes =require("./routes/user")
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/request");
const taskRoutes = require("./routes/task");
const app = express();
const notificationRoutes = require("./routes/notification");
const teamRoutes = require("./routes/teams");

app.use('/requests', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use(cors());
app.use(express.json());
app.use("/requests", requestRoutes);
app.use(morgan("dev"));
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use("/notifications", notificationRoutes);
app.use("/teams", teamRoutes);
app.get("/", (req, res) => {
res.send("Enterprise Workflow Automation API");
});

module.exports = app;