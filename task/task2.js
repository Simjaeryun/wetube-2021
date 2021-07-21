import express from "express";

const PORT = 4000;
const app = express();
//Middleware
const logger = (req, res, next) => {
  console.log(`Path : ${req.path}`);
  next();
};
const timeLogger = (req, res, next) => {
  const date = new Date();
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  console.log(`Time : ${year}-${month}-${day}`);
  next();
};

const securityLogger = (req, res, next) => {
  const protocol = req.protocol;
  if (protocol === "http") {
    console.log(`Insecure ❌`);
  }
  next();
};

const protectedMiddelware = (req, res, next) => {
  if (req.url === "/protected") {
    res.send("Not Allowed");
  } else {
    next();
  }
};

app.use(logger);
app.use(timeLogger);
app.use(securityLogger);
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

//Server
const handleListening = () =>
  console.log(`Server Listening on port ${PORT} 🤗`);
app.listen(PORT, handleListening);
