import { osloBysykkelService } from '$lib/server';

export const GET = async () => {
	return new Response(await osloBysykkelService.getStatus(), {
		headers: { 'content-type': 'application/json' },
	});
};
