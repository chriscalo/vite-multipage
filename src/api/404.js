import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "404.html");

export default function notFound(req, res) {
  res.status(404).sendFile(filePath);
}
