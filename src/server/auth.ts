import express, { Router, Request, Response } from "express";
import { remultExpress } from "remult/remult-express";
import { remult } from "remult";
import { User } from "./shared/user";
import { Session } from "express-session";
import { Todo } from "./shared/todo";

export interface ISession extends Session {
  name?: string;
  email?: string;
  password: string;
}

const api = remultExpress({});

export const auth = Router();

auth.use(express.json());

auth.post(
  "/api/signUp",
  api.withRemult,
  async (req: Request, res: Response) => {
    const user = await remult
      .repo(User)
      .save({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    res.json(user);
  }
);

auth.post(
  "/api/signIn",
  api.withRemult,
  async (req: Request, res: Response) => {
    const user = await remult
      .repo(User)
      .find({ where: { email: req.body.email } });
    if (user.length > 1) {
      if (user[0].password == req.body.password) {
        (req.session as ISession).id = user[0].id;
        res.json(user);
      }
    } else {
      res.status(404).json("Invalid user or password");
    }
  }
);
auth.post("/api/createTodo",
api.withRemult,
async (req: Request, res: Response) => {
  const todo = await remult
    .repo(Todo)
    .save({ name:req.body.name, userId: req.session.id});
    res.json(todo)
})
auth.get(
  "/api/getTodo",
  api.withRemult,
  async (req: Request, res: Response) => {
    const user = await remult
      .repo(User)
      .find({ where: { id: req.session.id } });
      res.json(user[0]?.todo)
  }
);
auth.post("/api/signOut", (req, res) => {
  req.session.id = "";
  res.json("signed out");
});

auth.get("/api/currentUser", (req, res) => res.json(req.session.id));
