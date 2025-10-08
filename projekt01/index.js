import { createServer } from 'node:http';
import { URL } from "node:url";
import { readFileSync } from "node:fs";


const index_html = readFileSync("static/index.html");
const favicon = readFileSync("favicon.ico");

// Create a HTTP server
const server = createServer((req, res) => {
  const request_url = new URL(`http://${host}${req.url}`);
  const path = request_url.pathname;
  console.log(`Request: ${req.method} ${path}`);


  
  if (req.method !== 'GET') {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method not allowed\n");
  }
  else if (path === "/"){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index_html);
  }
  else if (path === "/favicon.ico"){
    res.writeHead(200, {'Content-Type': 'image/vnd.microsoft.icon'} );
    res.end(favicon);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Site not found!\n');
  }
});

const port = 8000;
const host = "localhost";

// Start the server
server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});