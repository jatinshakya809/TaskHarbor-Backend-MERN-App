import express from "express";
import { connectDB } from "./conn/connection.js";
import color from "colors";
import UserRouter from "./routes/auth.js";
import listRouter from "./routes/list.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/list", listRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(color.rainbow(`Server is listening at PORT ${PORT}`));
});
