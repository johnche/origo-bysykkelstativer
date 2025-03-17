import { osloBysykkelService } from '$lib/server';

export const GET = async () => {
	return new Response(await osloBysykkelService.getStations(), {
		headers: { 'content-type': 'application/json' },
	});
};
