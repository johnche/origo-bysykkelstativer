import { OSLOBYSYKKEL_API_BASE_URL } from '$env/static/private';
import { logger } from '$lib/server';
import type { StationInformation, StationStatus } from './types';

const log = logger.child({ module: 'oslo-bysykkel-api' });

const doFetch = (path: string, opts: RequestInit = {}, baseUrl = OSLOBYSYKKEL_API_BASE_URL) => {
	const { headers, ...rest } = opts;
	return fetch(`${baseUrl}${path}`, {
		headers: {
			...headers,
			//"Client-Identifier": ""
		},
		...rest,
	});
};

export const getStations = async () => {
	const res = await doFetch('/station_information.json');

	if (!res.ok) {
		log.error(`failed to fetch stations: ${res.status} ${res.statusText}`);
	}

	let stationsResponse: StationInformation;
	try {
		stationsResponse = await res.json();
	} catch (e) {
		log.error('failed to deserialize station information');
		throw e;
	}

	return stationsResponse;
};

export const getStatus = async () => {
	const res = await doFetch('/station_status.json');

	if (!res.ok) {
		log.error(`failed to fetch station status: ${res.status} ${res.statusText}`);
	}

	let statusResponse: StationStatus;
	try {
		statusResponse = await res.json();
	} catch (e) {
		log.error('failed to deserialize status information');
		throw e;
	}

	return statusResponse;
};
