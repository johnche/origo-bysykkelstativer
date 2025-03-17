<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import { createStatusListenerStore, createMapStore, MAPSTORE_CONTEXT_KEY } from '$lib/stores';
	import { Marker, Popup } from 'maplibre-gl';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { createPopupContent } from './popup';

	let { data } = $props();

	const statusListenerStore = createStatusListenerStore(data.status);
	const mapStore = createMapStore();
	setContext(MAPSTORE_CONTEXT_KEY, mapStore);

	const markers: Record<string, Marker> = {};

	onMount(() => {
		data.stations.forEach((station) => {
			const popup = new Popup({ offset: 25 }).setDOMContent(
				createPopupContent(station, $statusListenerStore[station.station_id]),
			);

			markers[station.station_id] = new Marker()
				.setLngLat([station.lon, station.lat])
				.setPopup(popup)
				.addTo($mapStore);
		});

		statusListenerStore.subscribe((newStatus) => {
			data.stations.forEach((station) => {
				markers[station.station_id]
					.getPopup()
					.setDOMContent(createPopupContent(station, newStatus[station.station_id]));
			});
		});

		statusListenerStore.listen();
	});

	onDestroy(() => {
		statusListenerStore.cleanup();
	});
</script>

<Map />
