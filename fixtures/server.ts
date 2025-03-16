const BASE_PATH = './fixtures';
const PORT = 3000;

const server = Bun.serve({
	port: PORT,
	fetch(req: Request) {
		const filePath = BASE_PATH + req.url.slice('http://localhost:3000'.length);
		console.log(`Request: ${filePath}`);
		const file = Bun.file(filePath);
		return new Response(file);
	},
	error() {
		console.error('Failed to serve file');
		return new Response(null, { status: 404 });
	},
});

console.log(`Serving fixtures at ${server.url}`);
