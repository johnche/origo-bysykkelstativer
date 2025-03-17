import { vi, describe, expect, it, beforeEach, type Mock } from 'vitest';
import { osloBysykkelService } from '..';

import stationData from '../../../../fixtures/station_information.json';
import stationStatusData from '../../../../fixtures/station_status.json';

vi.mock('$lib/api/osloBysykkel', () => ({
	getStations: vi.fn(),
	getStatus: vi.fn(),
}));

vi.mock('$lib/server/redis.server', () => ({
	getStations: vi.fn(),
	getStationStatus: vi.fn(),
	setStations: vi.fn(),
	setStationStatus: vi.fn(),
	publishStatus: vi.fn(),
}));

describe('osloBysykkelService', async () => {
	const redis = await import('$lib/server/redis.server');
	const osloBysykkel = await import('$lib/api/osloBysykkel');
	const stationDataString = JSON.stringify(stationData);
	const statusDataString = JSON.stringify(stationStatusData);

	beforeEach(() => {
		vi.clearAllMocks();

		(osloBysykkel.getStations as Mock).mockResolvedValue(stationData);
		(osloBysykkel.getStatus as Mock).mockResolvedValue(stationStatusData);
		(redis.getStations as Mock).mockResolvedValue(stationDataString);
		(redis.getStationStatus as Mock).mockResolvedValue(statusDataString);
	});

	it('can store station data', async () => {
		await osloBysykkelService.updateStationData();

		expect(osloBysykkel.getStations).toHaveBeenCalled();
		expect(redis.setStations).toHaveBeenCalledWith(JSON.stringify(stationData));
	});

	// fallback has been called
	it('can provide station data', async () => {
		const result = await osloBysykkelService.getStations();

		expect(result).toEqual(stationDataString);

		// fallback should not run here
		expect(redis.setStations).not.toHaveBeenCalled();
	});

	it('publishes station status on update', async () => {
		await osloBysykkelService.updateStationStatusData();

		expect(osloBysykkel.getStatus).toHaveBeenCalled();
		expect(redis.publishStatus).toHaveBeenCalled();
	});

	it('can provide station status data', async () => {
		const result = await osloBysykkelService.getStatus();
		expect(result).toEqual(statusDataString);

		// fallback should not run here
		expect(redis.setStationStatus).not.toHaveBeenCalled();
	});

	it('has retry fallback when no station data is available', async () => {
		(redis.getStations as Mock).mockResolvedValue(null);

		await osloBysykkelService.getStations();

		// default check
		expect(redis.getStations).toHaveBeenCalled();

		// fallback fetch and store
		expect(osloBysykkel.getStations).toHaveBeenCalled();
		expect(redis.setStations).toHaveBeenCalled();
	});

	it('has retry fallback when no station status data is available', async () => {
		(redis.getStationStatus as Mock).mockResolvedValue(null);

		await osloBysykkelService.getStatus();

		// default check
		expect(redis.getStationStatus).toHaveBeenCalled();

		// fallback fetch and store
		expect(osloBysykkel.getStatus).toHaveBeenCalled();
		expect(redis.setStationStatus).toHaveBeenCalled();
	});
});
