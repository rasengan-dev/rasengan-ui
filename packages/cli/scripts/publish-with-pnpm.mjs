/**
 * Run by prepublishOnly: refuses a publish that is not pnpm's. pnpm replaces `workspace:*` with a version and applies
 * publishConfig; npm ships them as they are (@rasengan-ui/villages 0.1.0 went out that way, ADR-0016).
 */
const agent = process.env.npm_config_user_agent ?? "";

if (!agent.startsWith("pnpm/")) {
	console.error("Publish rasengan-ui with `pnpm publish`: `npm publish` ships `workspace:*` as it is (ADR-0016).");
	process.exit(1);
}
