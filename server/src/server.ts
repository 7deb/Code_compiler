import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import userRouter from "./routers/userRouter";
import compileRouter from "./routers/compilerRouter"
import cors from "cors";
dotenv.config();

const app = express();
const Port = Number(process.env.PORT) || 4001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/compute",compileRouter);


app.listen(Port, '0.0.0.0',() => {
  console.log(`server is running on ${Port}`);
});
