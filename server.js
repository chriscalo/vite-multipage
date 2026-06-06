import { createServer } from "node:http";
import express from "express";
import { app } from "./src/api/index.js";
import notFound from "./src/api/404.js";

app.use(express.static("dist"));
app.use(notFound);

const port = Number(process.env.PORT) || 3000;
const server = createServer(app);

await new Promise((resolve, reject) => {
  server.listen(port);
  server.once("listening", resolve);
  server.once("error", reject);
});

console.log(`Listening on http://localhost:${port}`);
