import { defineConfig } from "rasengan";
import { rasengan } from "rasengan/plugin";
import tailwindcss from "@tailwindcss/vite";
import { configure } from "@rasenganjs/vercel";
import mdx from "@rasenganjs/mdx/plugin";

export default defineConfig(async () => {
	return {
		// Boost performance
		// sageMode: {
		// 	// Enable React Compiler
		// 	rc: true,

		// 	// Enable React Server Components
		// 	rsc: true
		// },

		prerender: true,
		ssr: false,

		// Vite configuration
		vite: {
			plugins: [rasengan({ adapter: configure() }), tailwindcss(), mdx()],
		},
	};
});
