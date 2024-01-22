import { Router } from "express";
import { UserController } from "./user-controller";

export const createuser = Router();

createuser.post("/createuser", UserController.create);
