import type { StationStatus } from '$lib/api/osloBysykkel/types';
import type { Status } from '$lib/server/types';
import { writable } from 'svelte/store';

export const createStatusListenerStore = (initStatus: Status = {}) => {
	const { set, update, subscribe } = writable<Status>(initStatus);
	let liveStatus: EventSource | null;

	const listen = () => {
		liveStatus = new EventSource('/oslobysykkel/stations/status/live');

		liveStatus.onmessage = (e) => {
			const isDataPrefixed = e.data.slice(0, 'data'.length) === 'data';
			if (isDataPrefixed) {
				return;
			}

			const newStatus: Status = {};
			const stationStatus: StationStatus = JSON.parse(e.data);
			stationStatus.data.stations.forEach((station) => {
				newStatus[station.station_id] = station;
			});

			set(newStatus);
		};
	};

	const cleanup = () => {
		liveStatus?.close();
		liveStatus = null;
	};

	return {
		set,
		update,
		subscribe,
		listen,
		cleanup,
	};
};
