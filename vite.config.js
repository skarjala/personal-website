import { resolve } from "node:path";
import { defineConfig } from "vite";

const workPages = ["cores", "mathnasium", "meta", "moems", "openai", "site", "tlparse", "ucla"];

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...Object.fromEntries(
          workPages.map((page) => [page, resolve(__dirname, `work/${page}/index.html`)])
        ),
      },
    },
  },
});
