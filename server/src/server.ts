import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import userRouter from "./routers/userRouter";
import compileRouter from "./routers/compilerRouter"
import cors from "cors";
dotenv.config();

const app = express();
const Port = process.env.PORT || 4001;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/compute",compileRouter);

app.listen(Port, () => {
  console.log(`server is running on http://localhost:${Port}`);
});
