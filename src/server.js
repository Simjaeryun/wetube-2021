import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();

//Middleware
const logger = morgan("dev");

app.set("view engine", "pug"); //node가 실행되는 wetube폴더에서 views를 찾는다.
app.set("views", process.cwd() + "/src/views"); //src폴더안에 views폴더로 설정 해준다.
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(flash());
app.use(localsMiddleware);

app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
app.use(
  "/assets",
  express.static("assets"),
  express.static("node_modules/@ffmpeg/core/dist")
);
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"));
app.use("/api", apiRouter);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
export default app;
