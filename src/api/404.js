import { readFileSync } from "fs";

const html = readFileSync(new URL("404.html", import.meta.url), "utf8");

export default function notFound(req, res) {
  res.statusCode = 404;
  res.setHeader("content-type", "text/html");
  res.end(html);
}
