import type { Stations, Status } from '$lib/server/types';

export const createPopupContent = (
	station: Stations['data']['stations'][number],
	status: Status[string],
) => {
	const div = document.createElement('div');
	div.innerHTML = `
<h2 class="test">${station.name}</h2>
<h3>${station.cross_street}</h3>
<br />
Sykler tilgjengelige: ${status?.num_bikes_available}
Ledige låser: ${status?.num_docks_available}
    `;
	return div;
};
