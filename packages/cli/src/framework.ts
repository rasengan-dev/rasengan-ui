import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { readPackageJson } from "./project.ts";

export type Framework = "rasengan" | "next" | "vite" | "manual";

export const frameworkNames: Record<Framework, string> = {
	rasengan: "Rasengan.js",
	next: "Next.js",
	vite: "Vite",
	manual: "an unknown setup",
};

function versions(root: string) {
	const pkg = readPackageJson(root);
	return { ...pkg.devDependencies, ...pkg.dependencies };
}

export function detectFramework(root: string): Framework {
	const deps = versions(root);
	if (deps.rasengan) return "rasengan";
	if (deps.next) return "next";
	if (deps.vite && deps.react) return "vite";
	return "manual";
}

/** The major version a range allows at least (`^19.0.0`, `~4.1`, `4.*` → 19, 4); undefined for `latest`, tags or URLs. */
export function majorOf(range: string | undefined): number | undefined {
	const match = range?.match(/(\d+)/);
	return match ? Number(match[1]) : undefined;
}

/** Problems that stop `init` (Tailwind before v4) and ones it only reports (React before 19). */
export function checkVersions(root: string): { errors: string[]; warnings: string[] } {
	const deps = versions(root);
	const errors: string[] = [];
	const warnings: string[] = [];
	const tailwind = majorOf(deps.tailwindcss);
	if (!deps.tailwindcss) errors.push("Tailwind CSS isn't installed. The villages need Tailwind v4: https://tailwindcss.com/docs/installation");
	else if (tailwind !== undefined && tailwind < 4) errors.push(`Tailwind CSS ${deps.tailwindcss} is installed; the villages need v4 (\`@theme\`, \`@custom-variant\`).`);
	const react = majorOf(deps.react);
	if (!deps.react) errors.push("React isn't installed.");
	else if (react !== undefined && react < 19) warnings.push(`React ${deps.react} is installed; the components are tested on React 19.`);
	return { errors, warnings };
}

/** The file holding the page's <html> element, where the village attributes go. */
export function htmlFile(root: string, framework: Framework): string | undefined {
	const candidates: Record<Framework, string[]> = {
		rasengan: ["src/template.tsx", "src/template.jsx"],
		next: ["src/app/layout.tsx", "app/layout.tsx", "src/app/layout.jsx", "app/layout.jsx"],
		vite: ["index.html"],
		manual: [],
	};
	return candidates[framework].find((file) => existsSync(join(root, file)));
}

/** The stylesheet that imports Tailwind: the first `.css` under the usual folders with `@import "tailwindcss"`. */
export function findTailwindCss(root: string): string | undefined {
	const found: string[] = [];
	const walk = (dir: string, depth: number) => {
		if (depth > 4 || !existsSync(dir)) return;
		for (const entry of readdirSync(dir)) {
			if (entry === "node_modules" || entry.startsWith(".")) continue;
			const path = join(dir, entry);
			if (statSync(path).isDirectory()) walk(path, depth + 1);
			else if (entry.endsWith(".css") && /@import\s+["']tailwindcss["']/.test(readFileSync(path, "utf8"))) found.push(relative(root, path));
		}
	};
	for (const dir of ["src", "app", "styles"]) walk(join(root, dir), 0);
	return found.sort((a, b) => a.length - b.length)[0];
}
