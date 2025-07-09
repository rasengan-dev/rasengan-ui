import { defineConfig } from "rasengan";
import { rasengan } from "rasengan/plugin";
import tailwindcss from "@tailwindcss/vite";
import { configure } from "@rasenganjs/vercel";

export default defineConfig(async () => {
	return {
		vite: {
			plugins: [rasengan({ adapter: configure() }), tailwindcss()],
		},
	};
});
