import type { StationStatus } from '$lib/api/osloBysykkel/types';
import { osloBysykkel } from '$lib/api';
import { redis } from '$lib/server';
import { logger } from '$lib/server';
import type { Status } from './types';

const log = logger.child({ module: 'oslo-bysykkel-service' });

const transformToStationLookup = (status: StationStatus) => {
	const statusByStation: Status = {};

	status.data.stations.forEach((status) => {
		statusByStation[status.station_id] = status;
	});

	return statusByStation;
};

const publishStatus = (status: StationStatus) => {
	redis.publishStatus(JSON.stringify(status));
	return status;
};

export const updateStationData = () =>
	osloBysykkel
		.getStations()
		.then(JSON.stringify)
		.then(redis.setStations)
		.catch((e) => log.error('failed to update station data', e));

export const updateStationStatusData = () =>
	osloBysykkel
		.getStatus()
		.then(publishStatus)
		.then(transformToStationLookup)
		.then(JSON.stringify)
		.then(redis.setStationStatus)
		.catch((e) => log.error('failed to update station status data', e));

export const getStations = async () => {
	let stations = await redis.getStations();

	if (stations == null) {
		log.warn('stations not initialized yet, investigate this if it persists');
		stations = (await updateStationData()) || null;
	}

	return stations;
};

export const getStatus = async () => {
	let status = await redis.getStationStatus();

	if (status == null) {
		log.warn('status not initialized yet, investigate this if it persists');
		status = (await updateStationStatusData()) || null;
	}

	return status;
};
