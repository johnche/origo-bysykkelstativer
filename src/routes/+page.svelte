<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import { createMapStore, MAPSTORE_CONTEXT_KEY } from '$lib/stores';
	import { Marker, Popup } from 'maplibre-gl';
	import { onMount, setContext } from 'svelte';

	const mapStore = createMapStore();
	setContext(MAPSTORE_CONTEXT_KEY, mapStore);

	let { data } = $props();

	onMount(() => {
		data.stations.forEach((station) => {
			const popup = new Popup({ offset: 25 }).setHTML(`
<h2>${station.name}</h2>
<h3>${station.cross_street}</h3>
<br />
Sykler tilgjengelige: ${data.status[station.station_id]?.num_bikes_available}
Ledige låser: ${data.status[station.station_id]?.num_docks_available}
			`);
			new Marker().setLngLat([station.lon, station.lat]).setPopup(popup).addTo($mapStore);
		});
	});
</script>

<Map />
