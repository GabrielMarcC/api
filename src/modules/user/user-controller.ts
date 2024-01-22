import { Request, Response } from "express";
import { hash } from "bcrypt";
import { UserService } from "./user-service";

export class UserController {
  static async create(req: Request, res: Response) {
    const user = req.body;
    await UserService.save({
      email: user.email,
      password: await hash(user.password, 10),
    });

    res.json({ message: "created" });
  }
}
