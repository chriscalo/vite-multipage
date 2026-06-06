import express from "express";
import sessions from "client-sessions";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const FIVE_MINUTES_MS = 5 * 60 * 1000;

export const app = express();

app.use(sessions({
  cookieName: "session",
  secret: process.env.SESSION_SECRET,
  duration: ONE_DAY_MS,
  activeDuration: FIVE_MINUTES_MS,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" },
}));

app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "login.html"));
});

app.post("/api/login", express.urlencoded({ extended: false }), (req, res) => {
  req.session.user = { name: req.body.name };
  res.json({ ok: true });
});

app.post("/api/logout", (req, res) => {
  req.session.reset();
  res.json({ ok: true });
});

export function requireLogin(req, res, next) {
  if (!req.session?.user) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}
