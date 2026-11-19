/**
 * Run by prepublishOnly: refuses a publish that is not pnpm's. pnpm applies publishConfig.exports (dist/); npm
 * publish ships the workspace exports (src/), which the package does not contain: 0.1.0 went out that way (ADR-0016).
 */
const agent = process.env.npm_config_user_agent ?? "";

if (!agent.startsWith("pnpm/")) {
	console.error("Publish @rasengan-ui/villages with `pnpm publish`: `npm publish` ships the workspace exports (ADR-0016).");
	process.exit(1);
}
