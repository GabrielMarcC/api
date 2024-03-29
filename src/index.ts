import express from "express";
import { config } from "dotenv";
import { createuser as UserRouter } from "./modules/user/user-routes";
import { authRoutes as AuthRouter } from "./modules/auth/auth-routes";
import { createDBConnection } from "./database/connection";
import cors from "cors";

config();

const app = express();
createDBConnection()
  .then(() => console.log("sucess"))
  .catch((err) => console.log(err.message));

app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(AuthRouter);

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
