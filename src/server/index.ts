import { api } from "./api";
import express from "express";
import { remultExpress } from "remult/remult-express";
import { createPostgresConnection } from "remult/postgres";
import { Todo } from "./shared/todo";
import { User } from "./shared/user";
import session from "cookie-session";
import { auth } from "./auth";
import { UserController } from "./shared/authController";

const app = express();

const connectionString =
  "postgresql://postgres:1234@localhost:5432/mydb?schema=schema$prod";
console.log(process.env.DATABASE_UR);
app.use(
  remultExpress({
    entities: [Todo, User],
    controllers:[UserController],
    dataProvider: () =>
      createPostgresConnection({
        connectionString, // Default: process.env.DATABASE_URL
        autoCreateTables: true, // Entities will be synced with the database. Default: true
      }),
  })
);
app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "my secret",
  })
);
app.use(auth);
app.use(api);
app.listen(3002, () => console.log("Server started"));
