import { INotFoundRoute, IRouter } from "interfaces/router.js";
import userController from "./controllers/userController.js";
import http from 'node:http';

export default {
  "/api/users": {
    GET: userController.getAllUsers,
    POST: userController.createUser,
  },
  "/api/users/:id": {
    GET: userController.getUser,
    PUT: userController.updateUser,
    DELETE: userController.deleteUser,
  },
  notFound: (_, res:http.ServerResponse) => {
    res.writeHead(404);
    res.end('Route not found');
  }
} as unknown as IRouter & INotFoundRoute;
