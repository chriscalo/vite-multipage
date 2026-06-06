import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function notFound(req, res) {
  const filePath = join(__dirname, "404.html");
  res.status(404).sendFile(filePath);
}
