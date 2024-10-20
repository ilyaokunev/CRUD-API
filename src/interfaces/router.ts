import { IRequestUserDto, IResponseUserDto } from "./dto.js";
import http from "node:http";

export type ApiUsersMethods = "GET" | "POST" | "DELETE" | "PUT";

export type ApiPaths = "api/users" | "api/users/:id";

export type ApiPathsHandler = {
  [M in ApiUsersMethods]: (
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) => void | IResponseUserDto | IRequestUserDto[];
};

export type IRouter = {
  [K in ApiPaths]: ApiPathsHandler;
};

export type INotFoundRoute = {
  notFound: (_: http.IncomingMessage, res: http.ServerResponse) => void;
}
