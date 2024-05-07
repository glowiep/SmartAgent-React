import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      values: {
        "process.env.REACT_APP_CHATFLOW_ID": JSON.stringify(
          process.env.VITE_CHATFLOW_ID
        ),
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
