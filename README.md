# Origo city bikes

Visualizes city bikes

## Setup (development)

1. Install dependencies

``` bash
$ npm install
```

2. Fire up redis instance

``` bash
$ docker compose up -d redis
```

3. (Optional) If using local mock data, run fixtures server

``` bash
$ npm run fixtures
```

The mock server will be listening to `localhost` on port `5050`. The environment variable `OSLOBYSYKKEL_API_BASE_URL` in `.env` should then point to `http://localhost:5050`.

4. Run the app

``` bash
$ npm run dev
```

5. Open browser to `localhost:5173`

Profit!
