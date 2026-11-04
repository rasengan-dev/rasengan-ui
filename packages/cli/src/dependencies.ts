import { spawnSync } from "node:child_process";
import { declared, packageManager } from "./project.ts";
import type { RegistryItem } from "./registry.ts";

/** The npm packages the items need and the project doesn't declare yet, split into dependencies and devDependencies. */
export function missingPackages(root: string, items: RegistryItem[]) {
	const have = declared(root);
	const pick = (list: (item: RegistryItem) => string[] | undefined) => [...new Set(items.flatMap((item) => list(item) ?? []))].filter((name) => !have.has(name.replace(/(?!^)@.*$/, "")));
	return { dependencies: pick((item) => item.dependencies), devDependencies: pick((item) => item.devDependencies) };
}

/**
 * Installs them with the project's package manager. With `stderr`, its output goes to stderr: the MCP
 * server's stdout carries the protocol.
 */
export function installPackages(root: string, { dependencies, devDependencies }: ReturnType<typeof missingPackages>, { stderr = false } = {}) {
	const manager = packageManager(root);
	const verb = manager === "npm" ? "install" : "add";
	for (const [packages, dev] of [
		[dependencies, false],
		[devDependencies, true],
	] as const) {
		if (packages.length === 0) continue;
		const args = [verb, ...(dev ? [manager === "npm" ? "--save-dev" : "-D"] : []), ...packages];
		(stderr ? console.error : console.log)(`$ ${manager} ${args.join(" ")}`);
		const result = spawnSync(manager, args, { cwd: root, stdio: stderr ? ["ignore", 2, 2] : "inherit", shell: process.platform === "win32" });
		if (result.status !== 0) throw new Error(`${manager} ${verb} failed. Install them yourself: ${packages.join(" ")}`);
	}
}
