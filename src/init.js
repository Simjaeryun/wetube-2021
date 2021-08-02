import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

//Server
const handleListening = () =>
  console.log(`Server Listening on port ${PORT} 🤗`);
app.listen(PORT, handleListening);