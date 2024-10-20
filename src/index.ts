import http from "node:http";
import url from "node:url";
import router from './routes.js';

const PORT = 4000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();
  const query = path.startsWith('/api/users/') ? {id:path.replace('/api/users/', '')} : {}
  const pathForHandler =  path.startsWith('/api/users/') ? '/api/users/:id' : path
  const handler = router[pathForHandler] && router[pathForHandler][method];

  // const body = await new Promise((resolve, reject) => {

  //   let result = [];

  //   req.on('data', (data) => {
  //     result.push(data);
  //   })

  //   req.on('error', (e) => reject(e));

  //   req.on('end', () => resolve(result));
  // })

    const reqCloneWithQuery = {
      ...req,
      query: {}
    }

  for (const key in query) {
    reqCloneWithQuery.query[key] = query[key];
  }

  if (handler) {
    handler(reqCloneWithQuery, res)
  }
  
});

server.listen(PORT,() => console.log('\n\nserver starts'));
