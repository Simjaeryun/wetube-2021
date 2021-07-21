import express from "express";

const PORT = 4000;
const app = express();

//Middleware

const logger = (req, res, next) => {
  console.log(`Someone is going to:${req.url}`);
  next();
};

// Controller
const handleHome = (req, res, next) => res.send("hi");

//View
app.get("/", logger, handleHome);

//Server
const handleListening = () =>
  console.log(`Server Listening on port ${PORT} 🤗`);
app.listen(PORT, handleListening);
