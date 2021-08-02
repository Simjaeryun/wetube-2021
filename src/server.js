import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

//Middleware
const logger = morgan("dev");

app.set("view engine", "pug"); //node가 실행되는 wetube폴더에서 views를 찾는다.
app.set("views", process.cwd() + "/src/views"); //src폴더안에 views폴더로 설정 해준다.
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
