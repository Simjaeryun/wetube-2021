import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

//Server
const handleListening = () =>
  console.log(`Server Listening on port ${PORT} 🤗`);
app.listen(PORT, handleListening);
