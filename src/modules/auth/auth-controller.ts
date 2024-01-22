import { Request, Response } from "express";
import { UserService } from "../user/user-service";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export class Auth {
  static async login(req: Request, res: Response) {
    const user = await UserService.findByEmail(req.body.email);
    if (!user) {
      return res.json({ message: "invalid credentials" });
    }

    const match = await Auth.compare(req.body.password, user.password);
    if (!match) return res.json({ message: "invalid credentials" });

    const token = await Auth.createJwt({ user_id: user.id });
    res.json({ acess_Token: token });
  }

  static async compare(data: string, database: string) {
    return await compare(data, database);
  }

  static async createJwt(payload: string | object) {
    return jwt.sign(payload, process.env.JWT_SECRET ?? "", {
      expiresIn: "1h",
    });
  }
}
