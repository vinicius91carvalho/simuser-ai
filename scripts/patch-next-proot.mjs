/**
 * Patches Next.js get-network-host.js to handle PRoot environments
 * where os.networkInterfaces() throws due to uv_interface_addresses.
 *
 * Run via: node scripts/patch-next-proot.mjs
 * Called automatically by postinstall hook.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let nextPath;
try {
	nextPath = require.resolve("next/dist/lib/get-network-host.js");
} catch {
	console.log("next not found, skipping PRoot patch");
	process.exit(0);
}

const filePath = resolve(nextPath);
const content = readFileSync(filePath, "utf8");

const needle = "const interfaces = _os.default.networkInterfaces();";
if (!content.includes(needle)) {
	console.log("PRoot patch already applied or source changed, skipping");
	process.exit(0);
}

const patched = content.replace(
	needle,
	"let interfaces; try { interfaces = _os.default.networkInterfaces(); } catch { return []; }",
);

writeFileSync(filePath, patched, "utf8");
console.log("PRoot patch applied to next/dist/lib/get-network-host.js");
