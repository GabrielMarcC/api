import { Router } from "express";
import { UserController } from "./user-controller";

export const router = Router();

router.post("/user", UserController.create);
