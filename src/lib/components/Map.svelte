<script lang="ts">
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import { MAPSTORE_CONTEXT_KEY, type MapStore } from '$lib/stores';
	import {
		GeolocateControl,
		GlobeControl,
		Map,
		NavigationControl,
		ScaleControl,
		type LngLatLike,
	} from 'maplibre-gl';
	import { getContext, onMount } from 'svelte';

	const osloCoordinate: LngLatLike = [10.75, 59.91];

	let mapStore: MapStore = getContext(MAPSTORE_CONTEXT_KEY);

	let mapContainer: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!mapContainer) return;
		const map = new Map({
			container: mapContainer,
			style: `https://api.maptiler.com/maps/streets-v2-pastel/style.json?key=${PUBLIC_MAPTILER_KEY}`,
			center: osloCoordinate,
			zoom: 12,
			hash: true,
			attributionControl: false,
		});

		const geolocateControl = new GeolocateControl({
			positionOptions: { enableHighAccuracy: true },
			trackUserLocation: true,
		});

		map.addControl(geolocateControl, 'top-right');
		map.addControl(new NavigationControl({}), 'top-right');
		map.addControl(new GlobeControl(), 'top-right');
		map.addControl(new ScaleControl({ maxWidth: 80, unit: 'metric' }), 'bottom-left');

		map.on('load', () => geolocateControl.trigger());

		mapStore?.set(map);
	});
</script>

<div class="map" data-testid="map" bind:this={mapContainer}></div>

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';

	.map {
		width: 100dvw;
		height: 100%;
	}
</style>
