# Origo city bikes

Visualizes city bikes

## Usage

### Requirements

Make a copy of `.env.example` into either `.env` or `.env.local` or other env file needed and remember to fill in api keys.

For maptiler api key, `PUBLIC_MAPTILER_KEY`, the key can be created at [maptiler website](https://cloud.maptiler.com/account/keys/).

`bun` is needed for mock server, while `pnpm` is used as the main runtime.

### Installation

1. Install dependencies

```bash
$ pnpm install
```

2. Fire up redis instance

```bash
$ docker compose up -d redis
```

3. (Optional) If using local mock data, run fixtures server

```bash
$ pnpm fixtures
```

The mock server will be listening to `localhost` on port `5050`. The environment variable `OSLOBYSYKKEL_API_BASE_URL` in `.env` should then point to `http://localhost:5050`.

### Developing

```bash
$ pnpm dev --open
```
