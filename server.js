import { createServer } from "node:http";
import express from "express";
import { app } from "./src/api/index.js";
import notFound from "./src/api/404.js";

app.use(express.static("dist"));
app.use(notFound);

async function listen(app, port) {
  const listener = createServer(app);

  await new Promise((resolve, reject) => {
    listener.listen(port);
    listener.once("listening", resolve);
    listener.once("error", reject);
  });

  const url = `http://localhost:${port}`;
  return { url, port, listener };
}

const port = Number(process.env.PORT) || 3000;
const { url } = await listen(app, port);
console.log(`Listening on ${url}`);
