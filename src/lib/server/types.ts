import type { StationInformation, StationStatus } from '$lib/api/osloBysykkel/types';

export type Stations = StationInformation;
export type Status = Record<string, StationStatus['data']['stations'][number]>;
