/**
 * Simple static file server for Playwright testing.
 * Avoids uv_interface_addresses system call that fails in PRoot environments.
 * Serves files from apps/website/out/ directory.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const STATIC_DIR = join(__dirname, "..", "apps", "website", "out");
const PORT = Number(process.env.PORT || 9753);

const MIME_TYPES = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".ttf": "font/ttf",
	".txt": "text/plain; charset=utf-8",
	".webp": "image/webp",
	".avif": "image/avif",
};

async function fileExists(filePath) {
	try {
		const s = await stat(filePath);
		return s.isFile();
	} catch {
		return false;
	}
}

async function handler(req, res) {
	let urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;

	// Try these paths in order:
	const candidates = [
		join(STATIC_DIR, urlPath),
		join(STATIC_DIR, urlPath, "index.html"),
		join(STATIC_DIR, urlPath + ".html"),
	];

	let filePath = null;
	for (const candidate of candidates) {
		if (await fileExists(candidate)) {
			filePath = candidate;
			break;
		}
	}

	if (!filePath) {
		// Try 404.html
		const notFoundPath = join(STATIC_DIR, "404.html");
		if (await fileExists(notFoundPath)) {
			const content = await readFile(notFoundPath);
			res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
			res.end(content);
		} else {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Not Found");
		}
		return;
	}

	const ext = extname(filePath).toLowerCase();
	const contentType = MIME_TYPES[ext] || "application/octet-stream";

	try {
		const content = await readFile(filePath);
		res.writeHead(200, { "Content-Type": contentType });
		res.end(content);
	} catch {
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Internal Server Error");
	}
}

const server = createServer(handler);
server.listen(PORT, "127.0.0.1", () => {
	console.log(`Static server listening on http://127.0.0.1:${PORT}`);
});
