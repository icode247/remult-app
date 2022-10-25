import express, { Router, Response, Request } from "express";
import { User } from "./shared/user";
import { remult } from "remult";
import { UserController } from "./shared/authController";

export const auth = Router();

auth.use(express.json());


export const validUsers = [
  { id: "1", name: "Jane", roles: [] },
  { id: "2", name: "Steve", roles: [] },
];

auth.post("/api/signIn", async (req: Request, res: Response) => {
  try {
    const user = await UserController.findOne(req.body.email)
    if (user) {
      req.user = user;
      res.json(user);
    } else {
      res.status(404).json("Invalid user, try 'Steve' or 'Jane'");
    }
  } catch (e) {
    console.log(e);
  }
});

// auth.post("/api/signOut", (req: Request, res: Response) => {
//     req.session = undefined
//     res.json("signed out");
// });

auth.get("/api/currentUser", (req, res) => res.json(req.session));
