import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => res.send("hi")

//누군가 home으로 get request를 보낸다면 반응하는 콜백을 실행
app.get("/",handleHome )

const handleLogin = (req, res) =>{ return res.send("hi im login")}

app.get("/login", handleLogin);


const handleListening = () => console.log(`Server Listening on port ${PORT} 🤗`)

app.listen(PORT, handleListening);

