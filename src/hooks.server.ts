import { osloBysykkelService } from '$lib/server';
import type { ServerInit } from '@sveltejs/kit';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const init: ServerInit = async () => {
	dayjs.extend(duration);

	setInterval(
		osloBysykkelService.updateStationData,
		dayjs.duration({ hours: 12 }).asMilliseconds(),
	);
	setInterval(
		osloBysykkelService.updateStationStatusData,
		dayjs.duration({ seconds: 10 }).asMilliseconds(),
	);
};
