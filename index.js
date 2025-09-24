import { createServer } from "node:http";
import { URL } from "node:url";
import { handlePath } from "./path_handler.js";


// Create a HTTP server
const server = createServer((req, res) => {
  const request_url = new URL(`http://${host}${req.url}`);
  const path = request_url.pathname;
  console.log(`Request: ${req.method} ${path}`);

  if (req.method !== "GET") {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method not allowed\n");
  }

  handlePath(request_url.pathname, req, res);
  
});


const port = 12345;
const host = "localhost";

// Start the server
server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});