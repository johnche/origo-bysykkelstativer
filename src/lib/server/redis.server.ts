import { env } from '$env/dynamic/private';
import { createClient } from 'redis';
import { logger } from '$lib/server';
import { building } from '$app/environment';

const log = logger.child({ module: 'redis' });

const clientBase = createClient({
	socket: {
		host: env.REDIS_HOST,
		port: env.REDIS_PORT ? Number(env.REDIS_PORT) : 6379,
	},
}).on('error', (err) => log.error('Redis client error', err));

const client = clientBase.duplicate();
if (!building) {
	client.connect();
}

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
