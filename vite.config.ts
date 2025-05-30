import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				startpage: resolve(__dirname, "startpage/index.html"),
				solitaire: resolve(__dirname, "solitaire/index.html"),
			},
		},
	},
});
