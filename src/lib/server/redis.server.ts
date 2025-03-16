import { createClient } from 'redis';
import { logger } from '$lib/server';

const log = logger.child({ module: 'redis' });

const client = await createClient()
	.on('error', (err) => log.error('Redis client error', err))
	.connect();

export const getStations = async () => {
	return client.get('stations');
};

export const setStations = (stations: string) => {
	return client.set('stations', stations);
};

export const getStationStatus = async () => {
	return client.get('status');
};

export const setStationStatus = (stationStatus: string) => {
	return client.set('status', stationStatus);
};
