import userSchema from "./user-schema";

interface User {
  email: string;
  password: string;
}

export class UserService {
  static async save(user: User) {
    const savedUser = new userSchema(user);
    console.log(user);
    await savedUser.save();
  }

  static async findByEmail(email: string) {
    const user = await userSchema.find({ email: email });
    if (user !== null) return user[0];
    return null;
  }
}
