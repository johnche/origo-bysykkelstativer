import type { Stations, Status } from '$lib/server/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const [stationsRes, statusRes] = await Promise.all([
		fetch('/oslobysykkel/stations'),
		fetch('/oslobysykkel/stations/status'),
	]);

	const stations: Stations = await stationsRes.json();
	const status: Status = await statusRes.json();

	return {
		stations: stations.data.stations,
		status: status,
	};
};
