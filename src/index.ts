import http from "node:http";
import url from "node:url";
import router from "./routes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toUpperCase();
    const query = path.startsWith("/api/users/") ? { id: path.replace("/api/users/", "") } : null;
    const pathForHandler = path.startsWith("/api/users/") ? "/api/users/:id" : path;
    const handler = router[pathForHandler] && router[pathForHandler][method];

    if (handler) {
      handler(req, res, query);
    } else {
      router.notFound(req, res);
    }
  } catch (e) {
    res.writeHead(500);
    res.end(e);
  }
});

server.listen(PORT, () => console.log(`\n\nserver starts on port ${PORT}`));
