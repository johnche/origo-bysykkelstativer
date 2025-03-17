import { REDIS_HOST, REDIS_PORT } from '$env/static/private';
import { createClient } from 'redis';
import { logger } from '$lib/server';

const log = logger.child({ module: 'redis' });

const clientBase = await createClient({
	socket: {
		host: REDIS_HOST,
		port: Number(REDIS_PORT),
	},
}).on('error', (err) => log.error('Redis client error', err));

const client = await clientBase.duplicate().connect();

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

export const publishStatus = (status: string) => {
	return client.publish('status', status);
};

export const subscribeStatus = async (cb: Parameters<(typeof client)['subscribe']>[1]) => {
	const subscriber = await clientBase.duplicate().connect();
	subscriber.subscribe('status', cb);
	return subscriber;
};

export const unsubscribe = async (subscriber: Promise<typeof client>) => {
	(await subscriber).unsubscribe();
};
