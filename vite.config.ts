import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      __: resolve(__dirname, "./src"),
    },
  },
});
