import { redis } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const stream = new ReadableStream({
		start: (controller) => {
			const subscriber = redis.subscribeStatus((message) => {
				try {
					controller.enqueue(`data: ${message}\n\n`);
				} catch (_1) {
					// improperly closed connection not catched by request signal
					redis.unsubscribe(subscriber);
				}
			});

			request.signal.addEventListener('abort', () => {
				redis.unsubscribe(subscriber);
				controller.close();
			});
		},
	});

	return new Response(stream, {
		headers: {
			'content-type': 'text/event-stream',
			'cache-control': 'no-cache',
			'transfer-encoding': 'chunked',
			connection: 'keep-alive',
		},
	});
};
