import { osloBysykkelService } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';
import type { StationInformation, StationStatus } from '$lib/api/osloBysykkel/types';

export const GET: RequestHandler<StationInformation> = async () => {
	return new Response(await osloBysykkelService.getStations(), {
		headers: { 'content-type': 'application/json' },
	});
};
