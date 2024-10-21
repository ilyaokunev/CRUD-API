import http from "node:http";
import db from "../db/db.js";
import { validate } from "uuid";
import { IRequestUserDto } from "interfaces/dto.js";

class UserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async getAllUsers(_: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const users = await db.getAllUsers();
    res.writeHead(200);

    res.end(JSON.stringify(users));
    return;
  }

  async getUser(
    _: http.IncomingMessage,
    res: http.ServerResponse,
    query: { id: string }
  ): Promise<void> {
    const id = query.id;

    if (!validate(id)) {
      res.writeHead(400);
      res.end("Invalid id type");
      return;
    } else {
      const user = await db.getUser(id);

      if (user) {
        res.writeHead(200);
        res.end(JSON.stringify(user));
        return;
      } else {
        res.writeHead(404);
        res.end("User not exist");
        return;
      }
    }
  }

  async createUser(req: http.IncomingMessage, res: http.ServerResponse, id: string | null) {
    try {
      const body: string = await new Promise((resolve, reject) => {
        const result = [];
        req.on("data", (data) => {
          result.push(data);
        });
        req.on("error", (e) => reject(e));
        req.on("end", () => {
          resolve(result.toString());
        });
      });

      const parsedBody = JSON.parse(body) as Record<string, unknown>;

      if (UserController.checkIfValidBody(parsedBody)) {
        const userData = parsedBody as unknown as IRequestUserDto;

        const user = id ? await db.updateUser(userData, id) : await db.createUser(userData);

        res.writeHead(id ? 200 : 201);
        res.end(JSON.stringify(user));
        return;
      } else {
        res.writeHead(400);
        res.end("Body is invalid");
        return;
      }
    } catch (e) {
      res.writeHead(500);
      res.end(`Unexpected error: ${e}`);
    }
  }

  async updateUser(_: http.IncomingMessage, res: http.ServerResponse, query: { id: string }) {
    try {
      if (!validate(query.id)) {
        res.writeHead(400);
        res.end("Invalid id type");
        return;
      }

      if (!db.hasUser(query.id)) {
        res.writeHead(404);
        res.end("Invalid id");
        return;
      } else {
        await this.createUser(_, res, query.id);
      }
    } catch (e) {
      res.writeHead(500);
      res.end(e);
      return;
    }
  }

  async deleteUser(_: http.IncomingMessage, res: http.ServerResponse, query: { id: string }) {
    try {
      if (!validate(query.id)) {
        res.writeHead(400);
        res.end("Invalid id type");
        return;
      }

      if (!db.hasUser(query.id)) {
        res.writeHead(404);
        res.end("Invalid id");
        return;
      } else {
        res.writeHead(204);
        await db.deleteUser(query.id);
        res.end();
        return;
      }
    } catch (e) {
      res.writeHead(500);
      res.end(e);
      return;
    }
  }

  static checkIfValidBody(body: Record<string, unknown>): boolean {
    return (
      typeof body["username"] === "string" &&
      typeof body["age"] === "number" &&
      Array.isArray(body["hobbies"]) &&
      typeof body["hobbies"][0] === "string"
    );
  }
}

export default new UserController();
