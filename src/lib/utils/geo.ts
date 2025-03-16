export type Feature = {
	type: 'Feature';
	properties: Record<string, string | number | undefined>;
	geometry: {
		type: string;
		coordinates: [number, number];
	};
};
