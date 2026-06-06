import { createServer } from "node:http";
import { execSync } from "node:child_process";
import express from "express";
import { app } from "./src/api/index.js";
import notFound from "./src/api/404.js";

const DEVELOPMENT = process.env.NODE_ENV !== "production";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clearPort(port) {
  try {
    execSync(`fuser -k ${port}/tcp`, { stdio: "ignore" });
  } catch {}
}

app.use(express.static("dist"));
app.use(notFound);

export async function listen(app, port) {
  const listener = createServer(app);
  return startServer();

  async function startServer() {
    try {
      await new Promise((resolve, reject) => {
        listener.listen(port);
        listener.once("listening", resolve);
        listener.once("error", reject);
      });

      const url = `http://localhost:${port}`;
      return { url, port, listener };
    } catch (error) {
      if (DEVELOPMENT && error.code === "EADDRINUSE") {
        console.warn(`Port ${port} in use, retrying...`);
        await clearPort(port);
        await delay(1000);
        return startServer();
      }
      throw error;
    }
  }
}

const port = Number(process.env.PORT) || 3000;
const { url } = await listen(app, port);
console.log(`Listening on ${url}`);
