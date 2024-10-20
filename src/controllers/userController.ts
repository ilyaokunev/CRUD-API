import http from "node:http";
import db from "../db/db.js";
import { validate } from "uuid";

class UserController {
  async getAllUsers(_: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const users = await db.getAllUsers();
    res.writeHead(200);

    res.end(JSON.stringify(users));
  }

  async getUser(
    req: http.IncomingMessage & { query: string },
    res: http.ServerResponse
  ): Promise<void> {
    const id = req.query["id"];

    if (!validate(id)) {
      res.writeHead(400);
      res.end("Invalid id type");
    } else {
      const user = await db.getUser(id);

      if (user) {
        res.writeHead(200);
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404);
        res.end("User not exist");
      }
    }
  }
}

export default new UserController();
