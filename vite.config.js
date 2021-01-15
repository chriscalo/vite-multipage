import vue from "@vitejs/plugin-vue";
import { join, parse, resolve } from "path";

export default {
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: entryPoints(
        "index.html",
        "foo/index.html",
        "foo/bar/index.html",
      ),
    },
  },
};

function entryPoints(...paths) {
  const entries = paths.map(parse).map(entry => {
    const { dir, base, name, ext } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });
  
  const config = Object.fromEntries(entries);
  return config;
}
