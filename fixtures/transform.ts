import json from './station_status.json';

const val = json;
val.data.stations = val.data.stations.slice(0, 2);
console.log(JSON.stringify(val));
