import express from "express";

const PORT = 7000;
const app = express();

const handleHome = (req, res) => {
  return res.send("Home");
};

const handleAbout = (req, res) => {
  return res.send("About");
};
const handleContact = (req, res) => {
  return res.send("Contact");
};
const handleLogin = (req, res) => {
  return res.send("Login");
};

app.get("/", handleHome);
app.get("/about", handleAbout);
app.get("/contact", handleContact);
app.get("/login", handleLogin);

const handleListening = () => {
  console.log(`Server Listening on port ${PORT}`);
};

app.listen(PORT, handleListening);
