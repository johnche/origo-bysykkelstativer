import { writable } from 'svelte/store';
import type { Map as MaplibreMap } from 'maplibre-gl';

export const MAPSTORE_CONTEXT_KEY = 'maplibre-map-store';

export type MapStore = ReturnType<typeof createMapStore>;

// map store for maplibre-gl object
export const createMapStore = () => {
	const { set, update, subscribe } = writable<MaplibreMap>(undefined);

	return {
		subscribe,
		update,
		set,
	};
};
