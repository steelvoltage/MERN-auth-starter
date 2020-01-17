// MODULE IMPORTS

const path = require("path");
const express = require("express");
const connectMongoDb = require("./config/connectMongoDb");

// SERVER VARIABLES

const { NODE_ENV, PORT } = require("./config/env");
const app = express();
const authRouter = require("./api/auth/authRouter");
const userRouter = require("./api/user/userRouter");
const createRootAdmin = require("./config/createRootAdmin");

// DB CONNECTION

connectMongoDb();

// MIDDLEWARE

app.use(express.json({ extended: false }));

// API ROUTES

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// SERVES STATIC CLIENT-SIDE FILES WHEN IN PRODUCTION, OTHERWISE WEBPACK SERVER RUNS REACT USING THE CONCURRENTLY PACKAGE

if (NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// SERVER INITIATED AND LISTENING FOR REQUESTS

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
