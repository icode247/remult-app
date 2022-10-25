import { BackendMethod, Controller, Field, remult } from "remult";
import { User } from "./user";


export class UserController {
  @BackendMethod({ allowed: true })
  static async findOne(email: string) {
    return remult.repo(User).find({ where: { email } });
  }
}
