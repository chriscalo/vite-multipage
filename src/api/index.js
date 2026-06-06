import express from "express";
import sessions from "client-sessions";

export const app = express();

app.use(sessions({
  cookieName: "session",
  secret: process.env.SESSION_SECRET,
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" },
}));

app.post("/api/login", express.json(), (req, res) => {
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
