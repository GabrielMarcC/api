import { Router } from "express";
import { Auth } from "./auth-controller";

export const authRoutes = Router();

authRoutes.post("/auth", Auth.login);
